from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, db, Song, Comment
from app.forms import validation_errors_to_error_messages

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
    pass

# 14 Update a song by id
# PUT /api/songs/:id
@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_song_by_id(id):
    pass

# 15 Delete a song by id
# DELETE /api/songs/:id
@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song_by_id(id):
    pass

# 16 Create comment for a song by song id
# POST /api/songs/:id/comments
@song_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def create_comment_by_song_id(id):
    pass

# 17 Create like for a song by song id
# POST /api/songs/:id/likes
@song_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def create_like_by_song_id(id):
    pass

# 18 Cancel like for a song by song id
# DELETE /api/songs/:id/likes
@song_routes.route('/<int:id>/likes', methods=['DELETE'])
@login_required
def cancel_like_by_song_id(id):
    pass