const app = require('./app');
const request = require('supertest');
// const dotenv = require('dotenv').config();
// const mongoose = require('mongoose');

// dotenv.config({ path: `${__dirname}/config.env` });
// dotenv.config({});

// mongoose
// 	.connect(process.env.DATABASE, {})
// 	.then(() => {
// 		console.log('Connected to the database');
// 	})
// 	.catch((err) => console.log(err));

describe('Loging in User', () => {
	test('Email and password login with correct Credentials', async () => {
		const response = await request(app).post('/api/signin').send({
			email: 'achyuttim@gmail.com',
			password: 'achyuttim',
		});

		expect(response.statusCode).toBe(200);
	});

	test('Email and password login with wrong Credentials', async () => {
		const response = await request(app).post('/api/signin').send({
			email: 'achyuttim@gmail.com',
			password: 'achyuttim',
		});

		expect(response.statusCode).toBe(200);
	});
});

describe('job categories', () => {
	describe('getting job type', () => {
		test('getting all job type', async () => {
			const response = await request(app).get('/api/type/jobs');

			expect(response.statusCode).toBe(200);
		});

		test('getting all job type', async () => {
			const response = await request(app).get('/api/type/jobs');

			expect(response.statusCode).toBe(200);
		});
	});

	describe('getting all jobs', () => {
		test('getting all jobs', async () => {
			const response = await request(app).get('/api/jobs/show');

			expect(response.statusCode).toBe(200);
		});

		test('getting all jobs', async () => {
			const response = await request(app).get('/api/jobs/show');

			expect(response.statusCode).toBe(200);
		});
	});
});

describe('getting all users', () => {
	test('getting all users', async () => {
		const response = (await request(app).get('/api/allusers')).set(
			'Authorization',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTgyNzdjOGI0N2JjNDdkODNkYmU2YyIsImlhdCI6MTY5MTQxMzYyNiwiZXhwIjoxNjkxNDE3MjI2fQ.MST0Zzj5U6L4lD_8nesv-nATwsA1pv_nvgoY4rSf29k'
		);

		expect(response.statusCode).toBe(200);
	});

	test('getting all users', async () => {
		const response = await request(app)
			.get('/api/allusers')
			.set(
				'Authorization',
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTgyNzdjOGI0N2JjNDdkODNkYmU2YyIsImlhdCI6MTY5MTQxMzYyNiwiZXhwIjoxNjkxNDE3MjI2fQ.MST0Zzj5U6L4lD_8nesv-nATwsA1pv_nvgoY4rSf29k'
			);

		expect(response.statusCode).toBe(200);
	});
});
