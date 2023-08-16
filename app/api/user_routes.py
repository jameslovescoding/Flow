from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, db, Song
from app.forms import UpdateUserForm
from app.forms import validation_errors_to_error_messages
from .aws_s3_helper import (
    get_unique_filename,
    upload_file_to_s3,
    remove_file_from_s3,
    batch_remove_from_s3
)

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

    # check if the user exists
    if user is None:
        return {'errors': 'user not found'}, 404
    return user.to_dict_public()

# 09 Update a user's info
# PUT /api/users/:id

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    """
    Update first name, last name, bio of a user
    """
    # check if the user with this id exists
    user = User.query.get(id)
    if user is None:
        return {'errors': 'user not found'}, 404

    # user can only update its own user info
    if current_user.id != user.id:
        return {'errors': 'Unauthorized'}, 401

    # use update user form to validate info
    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    #print(form.data)

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # check if there's changes
    if len(form.data) == 0:
        return {'errors': "Missing fields to update"}, 400

    # update
    if form.data['first_name'] is not None:
        user.first_name = form.data['first_name']
    if form.data['last_name'] is not None:
        user.last_name = form.data['last_name']
    if form.data['bio'] is not None:
        user.bio = form.data['bio']

    # commit changes and return the updated user
    db.session.commit()
    return user.to_dict()



# 27 Update a user's profile picture
# PUT /api/users/:id/profile-pic

@user_routes.route('/<int:id>/profile-pic', methods=['PUT'])
@login_required
def update_user_profile_pic(id):
    """
    Update profile picture of a user
    The storage of profile picture is using aws s3
    """
    # check if the user with this id exists
    user = User.query.get(id)
    if user is None:
        return {'errors': 'user not found'}, 404

    # user can only update its own user info
    if current_user.id != user.id:
        return {'errors': 'Unauthorized'}, 401

    # use update user form to validate info
    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        print("form validation not passing")
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # check if the file is in the form
    if form.data['profile_pic_file'] is None:
        print("form data not found")
        return {"errors": {"missing files": "profile picture file is required"} }, 400

    # get the file
    profile_pic = form.data['profile_pic_file']

    # we upload file and use new uuid name eveytime
    # this is important for the browser to detect the change and update the page
    profile_pic.filename = get_unique_filename(profile_pic.filename)
    upload_pic = upload_file_to_s3(profile_pic)

    print(upload_pic)

    # check result
    if "url" not in upload_pic:
        return {'errors': {"Upload Failed": "Failed to upload your profile picture"}}, 500

    # then, we delete the old one on aws s3, if there's any
    if user.profile_pic_url is not None:
        remove_file_from_s3(user.profile_pic_url)

    # save the url to the user and commit changes
    user.profile_pic_url = upload_pic["url"]
    db.session.commit()

    # return the updated user
    return user.to_dict()



# 28 Delete a user's profile picture
# DELETE /api/users/:id/profile-pic

@user_routes.route('/<int:id>/profile-pic', methods=['DELETE'])
@login_required
def delete_user_profile_pic(id):
    """
    Delete profile picture of a user
    The storage of profile picture is using aws s3
    """
    # check if the user with this id exists
    user = User.query.get(id)
    if user is None:
        return {'errors': 'user not found'}, 404

    # user can only update its own user info
    if current_user.id != user.id:
        return {'errors': 'Unauthorized'}, 401

    # if the user doesn't have profile picture, return error
    profile_pic_url_old = user.profile_pic_url
    if profile_pic_url_old is None:
        return {"errors": {"Bad Request": "The user does not have a profile picture"}}, 400

    # delete the profile picture from aws s3
    batch_remove_from_s3("profile picture", [profile_pic_url_old])

    # delete profile picture url from the user
    user.profile_pic_url = None

    # commit changes and return updated user
    db.session.commit()
    return user.to_dict()


# 10 Delete a user
# DELETE /api/users/:id

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    # check if the user with this id exists
    user = User.query.get(id)
    if user is None:
        return {'errors': 'user not found'}, 404

    # user can only delete its own account
    if current_user.id != user.id:
        return {'errors': ['Unauthorized']}, 401

    # delete all songs and profile picture on aws s3
    profile_pic_url_old = user.profile_pic_url
    batch_remove_from_s3("profile picture", [profile_pic_url_old])

    # delete all songs files on aws s3
    song_url_list = [song.s3_key for song in user.owned_songs]
    batch_remove_from_s3("song file", song_url_list)

    # delete all thumbnail files on aws s3
    thumbnail_url_list = [song.thumbnail_url for song in user.owned_songs if song.thumbnail_url is not None]
    batch_remove_from_s3("thumbnail file", thumbnail_url_list)

    # delete the user and commit changes
    db.session.delete(user)
    db.session.commit()
    return {'message': f'Successfully deleted user with id {id}'}