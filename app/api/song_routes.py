from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, db, Song, Comment

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
    song = Song.query.get(id)
    if song is None:
        return {'errors': f'song with id {id} does not exist'}, 404
    return song.to_dict()



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
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # upload song
    song_file = form.data["song_file"]

    # save the original filename
    original_filename = song_file.filename

    # generate unique filename using uuid
    song_file.filename = get_unique_filename(song_file.filename)

    # upload song file to was s3
    upload_song = upload_file_to_s3(song_file)

    # check result
    if "url" not in upload_song:
        return {"errors": f"Failed to upload song file with url {original_filename}"}, 500

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



# 14 Update a song by id
# PUT /api/songs/:id

@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_song_by_id(id):
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
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # check if any data passed in
    if len(form.data) == 0:
        return {'errors': "Missing fields to update"}, 400

    # update song's data
    if form.data['title'] is not None:
        song.title = form.data['title']
    if form.data['artist'] is not None:
        song.artist = form.data['artist']
    if form.data['album'] is not None:
        song.album = form.data['album']
    if form.data['genre'] is not None:
        song.genre = form.data['genre']
    if form.data['description'] is not None:
        song.description = form.data['description']
    if form.data['release_date'] is not None:
        song.release_date = form.data['release_date']
    if form.data['lyrics'] is not None:
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
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # check if song audio file exists in the form
    if form.data['song_file'] is None:
        return {'errors': "song audio file is required"}, 400

    # create unique filename and save it to aws s3
    song_file = form.data["song_file"]

    # remember original filename
    original_filename = song_file.filename

    # we use previously generated name if it exists
    if song.s3_key is None:
        song_file.filename = get_unique_filename(song_file.filename)
    else:
        song_file.filename = song.s3_key

    # aws will overwrite old file with new one if they have same filename
    upload_song = upload_file_to_s3(song_file)

    # check result
    if "url" not in upload_song:
        return {"errors": f"Failed to upload song audio file with url {original_filename}"}, 500

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
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # check if song audio file exists in the form
    if form.data['thumbnail_file'] is None:
        return {'errors': "song thumbnail file is required"}, 400

    # create unique filename and save it to aws s3
    thumbnail_file = form.data["thumbnail_file"]

    # remember original filename
    original_filename = thumbnail_file.filename

    # we use previously generated name if it exists
    if song.thumbnail_url is None:
        thumbnail_file.filename = get_unique_filename(thumbnail_file.filename)
    else:
        thumbnail_file.filename = song.thumbnail_url

    # aws will overwrite old file with new one if they have same filename
    upload_thumbnail = upload_file_to_s3(thumbnail_file)

    # check result
    if "url" not in upload_thumbnail:
        return {"errors": f"Failed to upload song thumbnail file with url {original_filename}"}, 500

    # commit changes
    song.thumbnail_url = upload_thumbnail["url"]
    db.session.commit()

    # return updated song
    return song.to_dict()

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
        return {"errors": f"Song with id {id} does not have thumbnail"}, 400

    # remove the thumbnail from awss3
    delete_file = remove_file_from_s3(song.thumbnail_url)

    # check result
    if delete_file is not True:
        return {"errors": f"Failed to remove thumbnail, {delete_file.errors}"}, 500

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
    batch_remove_from_s3("song audio file", [song.s3_key])
    batch_remove_from_s3("song thumbnail file", [song.thumbnail_url])

    # delete the song from our database and commit
    db.session.delete(song)
    db.session.commit()

    # send message
    return {"message": "Successfully delete song"}



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
    return new_comment.to_dict()



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