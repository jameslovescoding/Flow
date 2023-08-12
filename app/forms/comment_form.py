from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length

class CommentForm(FlaskForm):

    # required fields

    text = StringField("text", validators=[
        DataRequired(),
        Length(min=1, max=255, message='Comment should be no longer than 255 characters')
    ])