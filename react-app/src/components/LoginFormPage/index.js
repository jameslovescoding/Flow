import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitDisable, setSubmitDisable] = useState(true);

  useEffect(() => {
    setSubmitDisable(email.length < 4 || password < 8)
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleGoToSignUp = () => {
    history.push('/signup')
  }

  const handleGoToHome = () => {
    history.push('/')
  }

  if (sessionUser) return <Redirect to="/my-home" />;

  return (
    <>
      <h1>Log In</h1>
      <p>You need to log in to view this content!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <ul>
            {Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <div>
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
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Please enter your password"}
              required
            />
          </label>
        </div>
        <button disabled={submitDisable} type="submit">Log In</button>
      </form>
      <p>Don't have an account?</p>
      <button onClick={handleGoToSignUp}>Create New Account</button>
      <p>Or, keep browsing</p>
      <button onClick={handleGoToHome}>Go to Home</button>
    </>
  );
}

export default LoginFormPage;
