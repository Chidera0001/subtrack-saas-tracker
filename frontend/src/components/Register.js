import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = ({ onLogin }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		// Basic validation
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters long");
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post(
				`${
					process.env.REACT_APP_API_URL || "https://subtrack-backend.azurewebsites.net"
				}/api/auth/register`,
				{
					name: formData.name,
					email: formData.email,
					password: formData.password,
				}
			);

			onLogin(response.data.token, response.data.user);
		} catch (error) {
			setError(error.response?.data?.error || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-container">
			<form onSubmit={handleSubmit} className="auth-form">
				<h2>Create SubTrack Account</h2>

				{error && <div className="error-message">{error}</div>}

				<div className="form-group">
					<label htmlFor="name">Full Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						minLength="6"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
						minLength="6"
					/>
				</div>

				<button type="submit" disabled={loading} className="submit-btn">
					{loading ? "Creating Account..." : "Register"}
				</button>

				<p>
					Already have an account? <Link to="/login">Login here</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
