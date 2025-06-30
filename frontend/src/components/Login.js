import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
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

		try {
			const response = await axios.post(
				`${
					process.env.REACT_APP_API_URL || "http://localhost:5000"
				}/api/auth/login`,
				formData
			);

			onLogin(response.data.token, response.data.user);
		} catch (error) {
			setError(error.response?.data?.error || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-container">
			<form onSubmit={handleSubmit} className="auth-form">
				<h2>Login to SubTrack</h2>

				{error && <div className="error-message">{error}</div>}

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
					/>
				</div>

				<button type="submit" disabled={loading} className="submit-btn">
					{loading ? "Logging in..." : "Login"}
				</button>

				<p>
					Don't have an account? <Link to="/register">Register here</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
