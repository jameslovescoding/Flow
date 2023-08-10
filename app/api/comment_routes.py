from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, db, Song, Comment
from app.forms import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

# 19 Update a comment by id

# 20 Delete a comment by id