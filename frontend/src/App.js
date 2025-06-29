import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user") || "null")
	);

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		}
	}, [token]);

	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		}
	}, [user]);

	const handleLogin = (token, userData) => {
		setToken(token);
		setUser(userData);
	};

	const handleLogout = () => {
		setToken(null);
		setUser(null);
	};

	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<h1>SubTrack</h1>
					{user && (
						<div className="user-info">
							<span>Welcome, {user.name}!</span>
							<button onClick={handleLogout} className="logout-btn">
								Logout
							</button>
						</div>
					)}
				</header>

				<main>
					<Routes>
						<Route
							path="/login"
							element={
								!token ? (
									<Login onLogin={handleLogin} />
								) : (
									<Navigate to="/dashboard" />
								)
							}
						/>
						<Route
							path="/register"
							element={
								!token ? (
									<Register onLogin={handleLogin} />
								) : (
									<Navigate to="/dashboard" />
								)
							}
						/>
						<Route
							path="/dashboard"
							element={
								token ? (
									<Dashboard token={token} user={user} />
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/"
							element={<Navigate to={token ? "/dashboard" : "/login"} />}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
