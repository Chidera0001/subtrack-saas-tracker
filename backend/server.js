const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
	res.json({ status: "OK", message: "SubTrack API is running" });
});

// Auth routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/subscriptions", require("./routes/subscriptions"));

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
