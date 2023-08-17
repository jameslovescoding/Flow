from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, db, Song, Comment
from app.forms import (
    validation_errors_to_error_messages,
    CommentForm
)

comment_routes = Blueprint('comments', __name__)

# 19 Update a comment by id
# PUT /api/comments/:id

@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment_by_id(id):
    # check if the comment exists
    comment = Comment.query.get(id)
    if comment is None:
        return {"errors": "comment does not exists"}, 404

    # check if the user is authorized to update the comment
    if comment.user_id != current_user.id:
        return {'errors': 'Unauthorized'}, 401

    # use form to validate the data
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # update the comment and commit
    comment.text = form.data["text"]
    db.session.commit()

    # return updated comment
    return comment.to_dict()



# 20 Delete a comment by id
# DELETE /api/comments/:id

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment_by_id(id):
    # check if the comment exists
    comment = Comment.query.get(id)
    if comment is None:
        return {"errors": "comment does not exists"}, 404

    # check if the user is authorized to delete the comment
    if comment.user_id != current_user.id:
        return {'errors': 'Unauthorized'}, 401

    # update the comment and commit
    db.session.delete(comment)
    db.session.commit()

    # return message
    return {"message": "Successfully deleted the comment"}