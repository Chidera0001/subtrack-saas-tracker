const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8181; // Force port to 8181 for Azure deployment

// Middleware
app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'https://subtrack-frontend.azurewebsites.net',
			'https://subtrack-frontend.azurewebsites.net/',
		],
		credentials: true,
	})
);
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
	res.json({ status: 'OK', message: 'SubTrack API is running' });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/subscriptions', require('./routes/subscription'));

// Error handling middleware
app.use((err, req, res, _next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
