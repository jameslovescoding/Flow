from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, db, Song, Comment
from app.forms import validation_errors_to_error_messages

playlist_routes = Blueprint('playlists', __name__)

# 21 View a playlist

# 22 Create a new playlist

# 23 Update a new playlist

# 24 Add song with song id to playlist with playlist id

# 25 Remove song with song id from playlist with playlist id

# 26 Delete the playlist