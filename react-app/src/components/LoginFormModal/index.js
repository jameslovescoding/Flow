import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal";
import { Redirect, useHistory } from "react-router-dom";


function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();
  const [submitDisable, setSubmitDisable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/my-home')
      closeModal()
    }
  };

  const handleRedirectToSignUp = () => {
    setModalContent(<SignupFormModal />)
  }

  const handleLoginWithDemoUser = async () => {
    const demoUserEmail = "david@aa.io"
    const demoUserPassword = "Password123$"
    setEmail(demoUserEmail);
    setPassword(demoUserPassword);
  }

  useEffect(() => {
    setSubmitDisable(email.length < 4 || password < 8)
  }, [email, password])

  return (
    <div className="auth-modal-container">
      <h1 className="auth-modal-heading-h1">Log In</h1>
      <form className="auth-modal-form" onSubmit={handleSubmit}>
        <div className="auth-modal-compact-grid">
          <label for="login-modal-email">Email</label>
          <input
            id="login-modal-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Please enter your email"}
            required
          />
        </div>
        <div className="auth-modal-compact-grid">
          <label for="login-modal-password">Password</label>
          <input
            id="login-modal-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Please enter your password"}
            required
          />
        </div>
        {Object.values(errors).length !== 0 &&
          <div className="error-message">
            <ul>
              {Object.values(errors).map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>}
        <button className="auth-modal-form-button hover-shadow" disabled={submitDisable} type="submit">Log In</button>
        <p>Or, you could slogin as demo user.</p>
      </form>
      <button className="auth-modal-form-button hover-shadow" onClick={handleLoginWithDemoUser}>Load Demo User Credential</button>

    </div>
  );
}

export default LoginFormModal;
