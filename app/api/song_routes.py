from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, db, Song, Comment
from app.forms import validation_errors_to_error_messages

song_routes = Blueprint('songs', __name__)

# 11 Get all songs

# 12 Get a song by id

# 13 Create a song

# 14 Update a song by id

# 15 Delete a song by id

# 16 Create comment for a song by song id

# 17 Create like for a song by song id

# 18 Cancel like for a song by song id