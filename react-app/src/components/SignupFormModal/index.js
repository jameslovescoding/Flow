import React, { useState } from "react";
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
			setErrors({ "confirm_papssword": "Confirm Password field must be the same as the Password field" });
		}
	};

	const handleGoToLogin = () => {
		setModalContent(<LoginFormModal />)
	}

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
							required
						/>
					</label>
				</div>

				<button type="submit">Sign Up</button>
			</form>
			<p>Already have an account?</p>
			<button onClick={handleGoToLogin}>Login</button>
		</>
	);
}

export default SignupFormModal;