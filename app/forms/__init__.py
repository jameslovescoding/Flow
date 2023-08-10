from .login_form import LoginForm, PreLoginForm
from .signup_form import SignUpForm, UpdateUserForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        error_message_concat = '. '.join(validation_errors[field])
        errorMessages[field] = error_message_concat
    return errorMessages