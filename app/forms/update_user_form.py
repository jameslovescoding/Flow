from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_s3_helper import ALLOWED_EXTENSIONS_AUDIO, ALLOWED_EXTENSIONS_IMAGE
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, ValidationError, Length, Regexp, Optional
from app.models import User

# We allow user upload their personal information after sign up

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

    profile_pic_file = FileField("profile_pic_file", validators=[
        Optional(),
        FileAllowed(list(ALLOWED_EXTENSIONS_IMAGE))
    ])