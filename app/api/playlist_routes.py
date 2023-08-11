from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, db, Song, Comment
from app.forms import validation_errors_to_error_messages

playlist_routes = Blueprint('playlists', __name__)

# 21 View a playlist
# GET /api/playlists/:id
@playlist_routes.route('/<int:id>')
@login_required
def get_playlist_by_id(id):
    pass

# 22 Create a new playlist
# POST /api/playlists
@playlist_routes.route('/', methods=['POST'])
@login_required
def create_new_playlist():
    pass

# 23 Update a new playlist
# PUT /api/playlists/:id
@playlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_playlist_by_id(id):
    pass

# 24 Add song to playlist with playlist id
# POST /api/playlists/:id/songs
@playlist_routes.route('/<int:id>/songs', methods=['POST'])
@login_required
def add_song_to_playlist(id):
    pass

# 25 Remove song from playlist with playlist id
# DELETE /api/playlists/:id/songs
@playlist_routes.route('/<int:id>/songs', methods=['DELETE'])
@login_required
def remove_song_from_playlist(id):
    pass

# 26 Delete the playlist
# DELETE /api/playlists/:id
@playlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_playlist_by_id(id):
    pass