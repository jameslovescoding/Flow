from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_s3_helper import ALLOWED_EXTENSIONS_AUDIO, ALLOWED_EXTENSIONS_IMAGE
from wtforms import StringField, PasswordField, DateField
from wtforms.validators import DataRequired, ValidationError, Length, Regexp, Optional
from wtforms import SubmitField
from datetime import date

def not_future_date(form, field):
    if field.data > date.today():
        raise ValidationError('Date cannot be a future date.')

class CreateSongForm(FlaskForm):

    # required fields

    title = StringField('title', validators=[
        DataRequired(),
        Length(min=1, max=256, message='Title should be no longer than 40 characters')
    ])

    artist = StringField('artist', validators=[
        DataRequired(),
        Length(min=1, max=256, message='Artist should be no longer than 255 characters')
    ])

    album = StringField('album', validators=[
        DataRequired(),
        Length(min=1, max=256, message='Album should be no longer than 40 characters')
    ])

    # use ALLOWED_EXTENSIONS_AUDIO to check audio file extension

    song_file = FileField("song_file", validators=[
        FileRequired(),
        FileAllowed(list(ALLOWED_EXTENSIONS_AUDIO))
    ])