from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, ValidationError, Length, Regexp, Optional
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):

    # required, not exists, longer than 4 characters, shorter than 40 characters

    username = StringField('username', validators=[
        DataRequired(),
        username_exists,
        Length(min=4, max=40, message='Username should be 4 to 40 long')
    ])

    # required, not exists, longer than 4 characters, shorter than 255 characters

    email = StringField('email', validators=[
        DataRequired(),
        user_exists,
        Length(min=4, max=255, message='Email should be 4 to 255 long')
    ])

    # required, longer than 8 characters, shorter than 255 characters
    # contains 0-9, contains a-z and A-Z, contains special characters

    password = PasswordField('password', validators=[
        DataRequired(),
        Length(min=8, max=255, message='Password should be 8 to 255 long'),
        Regexp(r'^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])', message='Password must contain at least one digit, lowercase letter, uppercase letter, and special character(@#$%^&+=)')
    ])

    # Optional items, if exists, shorter than 40 characters

    first_name = StringField('first_name', validators=[
        Optional(),
        Length(min=1, max=40, message='Maximum length of first name is 40'),
    ])

    # Optional items, if exists, shorter than 40 characters

    last_name = StringField('last_name', validators=[
        Optional(),
        Length(min=1, max=40, message='Maximum length of last name is 40'),
    ])

    # Optional items, if exists, shorter than 255 characters

    bio = StringField('bio', validators=[
        Optional(),
        Length(min=1, max=255, message='Maximum length of bio is 255'),
    ])

    # Optional items, if exists, shorter than 1024 characters

    profile_pic_url = StringField('profile_picture_url', validators=[
        Optional(),
        Length(min=1, max=1024, message='Maximum length of profile picture url is 1024'),
    ])



class UpdateUserForm(FlaskForm):
    # Optional items, if exists, shorter than 40 characters

    first_name = StringField('first_name', validators=[
        Optional(),
        Length(min=1, max=40, message='Maximum length of first name is 40'),
    ])

    # Optional items, if exists, shorter than 40 characters

    last_name = StringField('last_name', validators=[
        Optional(),
        Length(min=1, max=40, message='Maximum length of last name is 40'),
    ])

    # Optional items, if exists, shorter than 255 characters

    bio = StringField('bio', validators=[
        Optional(),
        Length(min=1, max=255, message='Maximum length of bio is 255'),
    ])

    # Optional items, if exists, shorter than 1024 characters

    profile_pic_url = StringField('profile_picture_url', validators=[
        Optional(),
        Length(min=1, max=1024, message='Maximum length of profile picture url is 1024'),
    ])