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

    const demoUserEmail = "james123456@gmail.com"

    const demoUserPassword = "123456Pa$$"

    const data = await dispatch(login(demoUserEmail, demoUserPassword));
    if (data) {
      setErrors(data);
    } else {
      history.push('/my-home')
      closeModal()
    }
  }

  useEffect(() => {
    setSubmitDisable(email.length < 4 || password < 8)
  }, [email, password])

  return (
    <>
      <h1>Log In</h1>
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
      <div>
        <p>Don't have an account?</p>
        <button onClick={handleRedirectToSignUp}>Create New Account</button>
      </div>
      <div>
        <button onClick={handleLoginWithDemoUser}>Demo User</button>
      </div>
    </>
  );
}

export default LoginFormModal;
