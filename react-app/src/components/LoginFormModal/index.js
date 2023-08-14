import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
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
      closeModal()
    }
  };

  const handleRedirectToSignUp = () => {
    setModalContent(<SignupFormModal />)
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
              required
            />
          </label>
        </div>
        <button disabled={submitDisable} type="submit">Log In</button>
      </form>
      <p>Don't have an account?</p>
      <button onClick={handleRedirectToSignUp}>Create New Account</button>
    </>
  );
}

export default LoginFormModal;
