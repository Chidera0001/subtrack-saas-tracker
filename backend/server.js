import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import subscriptionRoutes from './routes/subscription.js';

dotenv.config();

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
app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Error handling middleware
app.use((err, req, res, _next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Something went wrong!' });
});

// Only start the server if this file is run directly (not imported for testing)
if (import.meta.url === `file://${process.argv[1]}`) {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

export default app;
