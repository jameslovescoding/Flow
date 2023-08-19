import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import LoginFormModal from "../LoginFormModal";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal, setModalContent } = useModal();
	const [submitDisable, setSubmitDisable] = useState(true);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				history.push('/profile')
				closeModal();
			}
		} else {
			setErrors({ "confirm_papssword": "passwords need to match" });
		}
	};

	const handleGoToLogin = () => {
		setModalContent(<LoginFormModal />)
	}

	const handleLoadDemoData = () => {

	}

	useEffect(() => {
		setSubmitDisable(email.length < 4 || username.length < 4 || password < 8 || confirmPassword < 8)
	}, [email, username, password, confirmPassword])

	return (
		<div className="auth-modal-container-wide">
			<h1 className="auth-modal-heading-h1">Sign Up</h1>
			<form className="auth-modal-form" onSubmit={handleSubmit}>

				<div className="auth-modal-compact-grid">
					<label>
						Email
					</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder={"Please enter your email"}
						required
					/>
				</div>
				{errors.email && <p className="error-message">Error: {errors.email}</p>}

				<div className="auth-modal-compact-grid">
					<label>
						Username
					</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder={"Please choose your username"}
						required
					/>
				</div>
				{errors.username && <p className="error-message">Error: {errors.username}</p>}

				<div className="auth-modal-compact-grid">
					<label>
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder={"Please set your password"}
						required
					/>
				</div>
				{errors.password && <p className="error-message">Error: {errors.password}</p>}

				<div className="auth-modal-compact-grid">
					<label>
						Confirm Password
					</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder={"Please confirm your password"}
						required
					/>
				</div>
				{errors.confirm_papssword && <p className="error-message">Error: {errors.confirm_papssword}</p>}
				<p>Hints:</p>
				<p>Email and Username must be equal or longer than 4 characters. Password must be equal or longer than 8 characters. Containing at least 1 upper case, 1 lower case, 1 number and 1 special characters in "@ # $ % ^ & + =".</p>
				<button className="auth-modal-form-button hover-shadow" disabled={submitDisable} type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;