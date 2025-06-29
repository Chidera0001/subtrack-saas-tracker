const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Check if user exists
		const userExists = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);
		if (userExists.rows.length > 0) {
			return res.status(400).json({ error: "User already exists" });
		}

		// Hash password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create user
		const newUser = await pool.query(
			"INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
			[name, email, hashedPassword]
		);

		// Generate JWT
		const token = jwt.sign(
			{ userId: newUser.rows[0].id },
			process.env.JWT_SECRET || "fallback_secret",
			{ expiresIn: "7d" }
		);

		res.status(201).json({
			token,
			user: newUser.rows[0],
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

// Login user
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if user exists
		const user = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		if (user.rows.length === 0) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.rows[0].password);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Generate JWT
		const token = jwt.sign(
			{ userId: user.rows[0].id },
			process.env.JWT_SECRET || "fallback_secret",
			{ expiresIn: "7d" }
		);

		res.json({
			token,
			user: {
				id: user.rows[0].id,
				name: user.rows[0].name,
				email: user.rows[0].email,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
