import express from 'express';
import pool from '../config/db.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Get all subscriptions for user
router.get('/', authenticateToken, async (req, res) => {
	try {
		const subscriptions = await pool.query(
			'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY next_payment_date ASC',
			[req.user.userId]
		);
		res.json(subscriptions.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});

// Create new subscription
router.post('/', authenticateToken, async (req, res) => {
	try {
		const { service_name, monthly_cost, next_payment_date, payment_method } =
			req.body;

		const newSubscription = await pool.query(
			'INSERT INTO subscriptions (user_id, service_name, monthly_cost, next_payment_date, payment_method) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[
				req.user.userId,
				service_name,
				monthly_cost,
				next_payment_date,
				payment_method,
			]
		);

		res.status(201).json(newSubscription.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});

// Update subscription
router.put('/:id', authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;
		const { service_name, monthly_cost, next_payment_date, payment_method } =
			req.body;

		const updatedSubscription = await pool.query(
			'UPDATE subscriptions SET service_name = $1, monthly_cost = $2, next_payment_date = $3, payment_method = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
			[
				service_name,
				monthly_cost,
				next_payment_date,
				payment_method,
				id,
				req.user.userId,
			]
		);

		if (updatedSubscription.rows.length === 0) {
			return res.status(404).json({ error: 'Subscription not found' });
		}

		res.json(updatedSubscription.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});

// Delete subscription
router.delete('/:id', authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;

		const deletedSubscription = await pool.query(
			'DELETE FROM subscriptions WHERE id = $5 AND user_id = $6 RETURNING *',
			[id, req.user.userId]
		);

		if (deletedSubscription.rows.length === 0) {
			return res.status(404).json({ error: 'Subscription not found' });
		}

		res.json({ message: 'Subscription deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});

export default router;
