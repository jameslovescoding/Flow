import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitDisable, setSubmitDisable] = useState(true);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      } else {
        history.push('/profile')
      }
    } else {
      setErrors({ "confirm_papssword": "passwords need to match" });
    }
  };

  const handleGoToLogin = () => {
    history.push('/login');
  }

  const handleGoToHome = () => {
    history.push('/')
  }

  useEffect(() => {
    setSubmitDisable(email.length < 4 || username.length < 4 || password < 8 || confirmPassword < 8)
  }, [email, username, password, confirmPassword])

  if (sessionUser) return <Redirect to="/" />;

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {errors.email && <p>{errors.email}</p>}
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Please enter your email"}
              required
            />
          </label>
        </div>
        <div>
          {errors.username && <p>{errors.username}</p>}
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={"Please choose your username"}
              required
            />
          </label>
        </div>
        <div>
          {errors.password && <p>{errors.password}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Please set your password"}
              required
            />
          </label>
        </div>
        <div>
          {errors.confirm_papssword && <p>{errors.confirm_papssword}</p>}
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={"Please confirm your password"}
              required
            />
          </label>
        </div>
        <div>
          <p>Email and Username must be equal or longer than 4 characters.</p>
          <p>Password must be equal or longer than 8 characters. Containing at least 1 upper case, 1 lower case, 1 number and 1 special characters in "@#$%^&+="</p>
        </div>

        <button disabled={submitDisable} type="submit">Sign Up</button>
      </form >
      <p>Already have an account?</p>
      <button onClick={handleGoToLogin}>Go to Login</button>
      <p>Or, keep browsing</p>
      <button onClick={handleGoToHome}>Go to Home</button>
    </>
  );
}

export default SignupFormPage;
