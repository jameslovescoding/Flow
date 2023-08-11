from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_s3_helper import ALLOWED_EXTENSIONS_AUDIO, ALLOWED_EXTENSIONS_IMAGE
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

# When sign up, we don't want user upload profile picture,
# because it is too slow.

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