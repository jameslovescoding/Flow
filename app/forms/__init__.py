from .login_form import LoginForm, PreLoginForm
from .signup_form import SignUpForm
from .update_user_form import UpdateUserForm
from .create_song_form import CreateSongForm
from .update_song_form import UpdateSongForm
from .comment_form import CommentForm

def validation_errors_to_error_messages(validation_errors):
    """
    turns the WTForms validation errors into a dictionary
    """
    errorMessages = {}
    for field in validation_errors:
        error_message_concat = '. '.join(validation_errors[field])
        errorMessages[field] = error_message_concat
    return errorMessages