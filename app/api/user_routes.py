from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import UpdateUserForm
from app.forms import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)

# 07 Get all users
# GET /api/users/

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict_public() for user in users]}

# 08 Get a user by id
# GET /api/users/:id

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)

    if user is None:
        return {'errors': 'user not found'}, 404
    return user.to_dict_public()

# 09 Update a user's info
# PUT /api/users/:id

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    """
    Update a user by id and return updated user in a dictionary

    Only support update first_name, last_name, bio, and profile picture
    """
    # user can only update its own user info
    if current_user.id != id:
        return {'errors': ['Unauthorized']}, 401
    # check if the user with this id exists
    user = User.query.get(id)
    if user is None:
        return {'errors': 'user not found'}, 404
    # use update user form to validate info
    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    #print(form.data)
    if form.validate_on_submit():
        if form.data['first_name'] is not None:
            user.first_name = form.data['first_name']
        if form.data['last_name'] is not None:
            user.last_name = form.data['last_name']
        if form.data['bio'] is not None:
            user.bio = form.data['bio']
        if form.data['profile_pic_url'] is not None:
            user.profile_pic_url = form.data['profile_pic_url']
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# 10 Delete a user
# DELETE /api/users/:id

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    # user can only delete its own account
    if current_user.id != id:
        return {'errors': ['Unauthorized']}, 401
    # check if the user with this id exists
    user = User.query.get(id)
    if user is None:
        return {'errors': 'user not found'}, 404
    db.session.delete(user)
    db.session.commit()
    return {'message': f'Successfully deleted user with id {id}'}