from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm, PreLoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        error_message_concat = '. '.join(validation_errors[field])
        errorMessages[field] = error_message_concat
    return errorMessages

# 01 Authenticates a user GET /api/auth/

@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401

# 02 Login a user POST /api/auth/login

@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# 03 Log our a user GET /api/auth/logout

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}

# 04 Sign up new user POST /api/auth/signup

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    #print(form.data)
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        if 'first_name' in form.data:
            user.first_name = form.data['first_name']
        if 'last_name' in form.data:
            user.last_name = form.data['last_name']
        if 'bio' in form.data:
            user.bio = form.data['bio']
        if 'profile_pic_url' in form.data:
            user.profile_pic_url = form.data['profile_pic_url']
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# 05 Return unauthorized GET /api/auth/unauthorized

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

# 06 Check if the email exists POST /api/auth/prelogin
@auth_routes.route('/prelogin', methods=['POST'])
def prelogin():
    """
    Logs a user in
    """
    form = PreLoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        if user is not None:
            return {'message': 'email exists'}, 200
        else:
            return {'errors': 'email does not exist'}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401