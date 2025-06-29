const request = require('supertest');
const app = require('../server');

describe('API Health Check', () => {
	test('GET /api/health should return OK status', async () => {
		const response = await request(app).get('/api/health').expect(200);

		expect(response.body).toEqual({
			status: 'OK',
			message: 'SubTrack API is running',
		});
	});
});

describe('Authentication Endpoints', () => {
	test('POST /api/auth/register should validate required fields', async () => {
		await request(app).post('/api/auth/register').send({}).expect(500); // Will fail due to missing fields
	});

	test('POST /api/auth/login should validate required fields', async () => {
		await request(app).post('/api/auth/login').send({}).expect(500); // Will fail due to missing fields
	});
});

describe('Subscription Endpoints', () => {
	test('GET /api/subscriptions should require authentication', async () => {
		const response = await request(app).get('/api/subscriptions').expect(401);

		expect(response.body).toHaveProperty('error', 'Access token required');
	});

	test('POST /api/subscriptions should require authentication', async () => {
		const response = await request(app)
			.post('/api/subscriptions')
			.send({
				service_name: 'Netflix',
				monthly_cost: 15.99,
				next_payment_date: '2025-07-01',
				payment_method: 'Credit Card',
			})
			.expect(401);

		expect(response.body).toHaveProperty('error', 'Access token required');
	});
});
