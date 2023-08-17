from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, db, Song, Comment
from sqlalchemy.orm import joinedload, subqueryload


from app.forms import (
    validation_errors_to_error_messages,
    CreateSongForm,
    UpdateSongForm,
    CommentForm
)

from .aws_s3_helper import (
    get_unique_filename,
    upload_file_to_s3,
    remove_file_from_s3,
    batch_remove_from_s3
)

song_routes = Blueprint('songs', __name__)

# 11 Get all songs
# GET /api/songs/

@song_routes.route('/')
@login_required
def get_all_songs():
    all_songs = Song.query.all()
    return {"all_songs": [song.to_dict() for song in all_songs]}



# 12 Get a song by id
# GET /api/songs/:id

@song_routes.route('/<int:id>')
@login_required
def get_song_by_id(id):
    song = Song.query.options(
        joinedload(Song.user_comments),
        joinedload(Song.liked_users)
        ).get(id)
    if song is None:
        return {'errors': f'song with id {id} does not exist'}, 404
    res = song.to_dict()
    res["all_comments"] = [comment.to_dict() for comment in song.user_comments]
    res["liked_count"] = len(song.liked_users)
    return res



# 13 Create a song
# POST /api/songs/new

@song_routes.route('/new', methods=['POST'])
@login_required
def create_new_song():
    """
    Create new song api
    requires only minimum information.
    requires song file uploaded.
    """
    # use CreateSongForm to validate data
    form = CreateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # upload song
    song_file = form.data["song_file"]
    print("dir song_file", dir(song_file))

    # save the original filename
    original_filename = song_file.filename

    # generate unique filename using uuid
    song_file.filename = get_unique_filename(song_file.filename)

    # upload song file to was s3
    upload_song = upload_file_to_s3(song_file)

    # check result
    if "url" not in upload_song:
        return {"errors": {"Upload Failed": "Failed to upload song audio file"}}, 500

    # create new song in our database if there's no error
    new_song = Song(
        title=form.data["title"],
        artist=form.data["artist"],
        album=form.data["album"],
        s3_key=upload_song["url"],
        uploaded_by_user_id=current_user.id
    )

    # commit changes
    db.session.add(new_song)
    db.session.commit()
    return new_song.to_dict()



# 14 Update metadata of a song by id
# PUT /api/songs/:id/meta

@song_routes.route('/<int:id>/meta', methods=['PUT'])
@login_required
def update_song_metadata_by_id(id):
    """
    Updating song's info
    except for song file and thumbnail file
    """
    # check if the song exists
    song = Song.query.get(id)
    if song is None:
        return {"errors": "song not found"}, 404

    # only the owner of the song can update the song
    if song.uploaded_by_user_id != current_user.id:
        return {'errors': 'Unauthorized'}, 401

    # use form to validate data
    form = UpdateSongForm()
    print("form data",form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # check if any data passed in
    if len(form.data) == 0:
        return {'errors': "Missing fields to update"}, 400

    # update song's data
    song.title = form.data['title']
    song.artist = form.data['artist']
    song.album = form.data['album']
    song.genre = form.data['genre']
    song.description = form.data['description']
    song.release_date = form.data['release_date']


    # commit changes
    db.session.commit()
    return song.to_dict()



# Update lyrics of a song by id
# PUT /api/songs/:id/lyrics

@song_routes.route('/<int:id>/lyrics', methods=['PUT'])
@login_required
def update_song_lyrics_by_id(id):
    """
    Updating song's info
    except for song file and thumbnail file
    """
    # check if the song exists
    song = Song.query.get(id)
    if song is None:
        return {"errors": "song not found"}, 404

    # only the owner of the song can update the song
    if song.uploaded_by_user_id != current_user.id:
        return {'errors': 'Unauthorized'}, 401

    # use form to validate data
    form = UpdateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # check if any data passed in
    if len(form.data) == 0:
        return {'errors': "Missing fields to update"}, 400

    # update song's data
    song.lyrics = form.data['lyrics']

    # commit changes
    db.session.commit()
    return song.to_dict()


# Update a song's audio file on aws s3
# PUT /api/songs/:id/song

@song_routes.route('/<int:id>/song', methods=['PUT'])
@login_required
def update_song_audio_file(id):
    """
    Updating song's audio file on aws s3
    """
    # check if the song exists
    song = Song.query.get(id)
    if song is None:
        return {"errors": "song not found"}, 404

    # only the owner of the song can update the song
    if song.uploaded_by_user_id != current_user.id:
        return {'errors': 'Unauthorized'}, 401

    # use form to validate data
    form = UpdateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # check if song audio file exists in the form
    if form.data['song_file'] is None:
        return {'errors': {"missing files": "song audio file is required"}}, 400

    # create unique filename and save it to aws s3
    song_file = form.data["song_file"]

    # remember original filename
    original_filename = song_file.filename

    # we get a new file name and upload to aws s3
    song_file.filename = get_unique_filename(song_file.filename)
    upload_song = upload_file_to_s3(song_file)

    # check result
    if "url" not in upload_song:
        return {"errors": {"Upload Failed": "Failed to upload your song file"}}, 500

    # then, we delete previous song from aws s3
    remove_file_from_s3(song.s3_key)

    # commit changes
    song.s3_key = upload_song["url"]
    db.session.commit()

    # return updated song
    return song.to_dict()

# User can not delete the audio file for a song
# User can only update the audio file of a song
# User can delete thumbnail of a song


# Update a song's thumbnail file on aws s3
# PUT /api/songs/:id/song

@song_routes.route('/<int:id>/thumbnail', methods=['PUT'])
@login_required
def update_song_thumbnail_file(id):
    """
    Update a song's thumbnail file on aws s3
    """
    # check if the song exists
    song = Song.query.get(id)
    if song is None:
        return {"errors": "song not found"}, 404

    # only the owner of the song can update the song
    if song.uploaded_by_user_id != current_user.id:
        return {'errors': 'Unauthorized'}, 401

    # use form to validate data
    form = UpdateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # check if song audio file exists in the form
    if form.data['thumbnail_file'] is None:
        return {'errors': {"missing files": "thumbnail file is required"}}, 400

    # get the file
    thumbnail_file = form.data["thumbnail_file"]

    # remember original filename
    original_filename = thumbnail_file.filename

    # first, we upload and get a new file name
    thumbnail_file.filename = get_unique_filename(thumbnail_file.filename)
    upload_thumbnail = upload_file_to_s3(thumbnail_file)

    # check upload result
    if "url" not in upload_thumbnail:
        return {"errors": {"Upload Failed": "Failed to upload your thumbnail file"} }, 500

    # then, we delete the old one on aws s3, if there's any
    if song.thumbnail_url is not None:
        remove_file_from_s3(song.thumbnail_url)


    # commit changes
    song.thumbnail_url = upload_thumbnail["url"]
    db.session.commit()

    # return updated song
    return song.to_dict()



# Remove a song's thumbnail file on aws s3
# DELETE /api/songs/:id/thumbnail

@song_routes.route('/<int:id>/thumbnail', methods=['DELETE'])
@login_required
def delete_song_thumbnail_file(id):
    song = Song.query.get(id)
    if song is None:
        return {"errors": "song not found"}, 404

    # only the owner of the song can update the song
    if song.uploaded_by_user_id != current_user.id:
        return {'errors': 'Unauthorized'}, 401

    # check if the song has a thumbnail
    if song.thumbnail_url is None:
        return {"errors": {"Bad Request": "This song does not have thumbnail"}}, 400

    # remove the thumbnail from awss3
    delete_file = remove_file_from_s3(song.thumbnail_url)

    # check result
    if delete_file is not True:
        return {"errors": {"Delete Failed":f"{delete_file.errors}"}}, 500

    # save changes and commit
    song.thumbnail_url = None
    db.session.commit()
    return song.to_dict()



# 15 Delete a song by id
# DELETE /api/songs/:id

@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song_by_id(id):
    """
    delete a song by id
    """
    # check if song exists
    song = Song.query.get(id)
    if song is None:
        return {"errors": "song not found"}, 404

    # check if the user is autherized to delete this song
    if song.uploaded_by_user_id != current_user.id:
        return {'errors': 'Unauthorized'}, 401

    # delete song audio and thumbnail
    if song.s3_key is not None:
        batch_remove_from_s3("song audio file", [song.s3_key])
    if song.thumbnail_url is not None:
        batch_remove_from_s3("song thumbnail file", [song.thumbnail_url])

    # delete the song from our database and commit
    db.session.delete(song)
    db.session.commit()

    # send message
    return {"message": "Successfully delete song"}




# Get all comments for a song by song id
# GET /api/songs/:id/comments

@song_routes.route('/<int:id>/comments')
@login_required
def get_all_comments_by_song_id(id):
    """
    get all comments of a song by song id
    """
    # check if the song exists
    song = Song.query.get(id)
    if song is None:
        return {"errors": "song not found"}, 404
    res_dict = {"all_comments": [comment.to_dict() for comment in song.user_comments]}
    print(res_dict)
    return res_dict



# 16 Create comment for a song by song id
# POST /api/songs/:id/comments

@song_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def create_comment_by_song_id(id):
    """
    create a comment for a song by song id
    users can comment on their own songs
    users can leave comments on one song
    """
    # check if the song exists
    song = Song.query.get(id)
    if song is None:
        return {"errors": "song not found"}, 404

    # use form to validate the comment data
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # save and commit
    new_comment = Comment(
        song_id=id,
        user_id=current_user.id,
        text=form.data["text"]
    )
    db.session.add(new_comment)
    db.session.commit()

    # return the comment
    res_dict = new_comment.to_dict()
    print(res_dict)
    return res_dict



# 17 Create like for a song by song id
# POST /api/songs/:id/likes

@song_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def create_like_by_song_id(id):
    """
    User can like a song
    """
    # check if the song exists
    song = Song.query.get(id)
    if song is None:
        return {"errors": "song not found"}, 404

    # check if the user already liked the song
    if song in current_user.liked_songs:
        return {"errors": "user already liked the song"}, 400

    # like the song and commit changes
    current_user.liked_songs.append(song)
    db.session.commit()

    # return message
    return {"message": "Successfully liked the song"}



# 18 Cancel like for a song by song id
# DELETE /api/songs/:id/likes

@song_routes.route('/<int:id>/likes', methods=['DELETE'])
@login_required
def cancel_like_by_song_id(id):
    """
    User can unlike a song
    """
    # check if the song exists
    song = Song.query.get(id)
    if song is None:
        return {"errors": "song not found"}, 404

    # check if the user already liked the song
    if song not in current_user.liked_songs:
        return {"errors": "user have not liked the song yet"}, 400

    # unlike the song and commit changes
    current_user.liked_songs.remove(song)
    db.session.commit()

    # return message
    return {"message": "Successfully unliked the song"}