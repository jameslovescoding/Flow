from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[
        DataRequired(),
        user_exists,
        Length(min=4, max=255, message='Email should be 4 to 255 long')
    ])
    password = StringField('password', validators=[
        DataRequired(),
        password_matches,
        Regexp(r'^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])',
               message='Password must contain at least one digit, lowercase letter, uppercase letter, and special character(@#$%^&+=)')
    ])


class PreLoginForm(FlaskForm):
    email = StringField('email', validators=[
        DataRequired(),
        user_exists,
        Length(min=4, max=255, message='Email should be 4 to 255 long')
    ])