const request = require('supertest')
const app = require('./server')
const { MongoClient } = require('mongodb')
const usersDAO = require('./dao/usersDAO')
const authDAO = require('./dao/authDAO')
const assert = require('assert')
const { describe } = require('jest-circus')

describe('insert', () => {
	let connection
	let db

	beforeAll(async () => {
		connection = await MongoClient.connect(process.env.MONGO_URL, {
			poolSize: 100,
			writeConcern: {
				w: 'majority',
				wtimeout: 2500
			},
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		db = await connection.db()

		const injectDB = async db => {
			await authDAO.injectDB(db)
			await usersDAO.injectDB(db)
		}
		injectDB(db)
	})

	describe('jwt authentication', () => {
		describe('POST /auth/register', () => {
			it('Creates an account when a user registers using a valid email and password', async () => {
				return request(app)
					.post('/auth/register')
					.send({
						email: 'bibsasdie@gmail.com',
						password: 'haasdasdll23'
					})
					.expect(201)
					.expect('Content-Type', /json/)
					.then(response => {
						assert(response.body, { success: true })
					})
			})
			it('Throws an error if an invalid email address is entered', async () => {
				return request(app)
					.post('/auth/register')
					.send({
						email: 'bibsieXgmail.com',
						password: 'haasdasdll23'
					})
					.expect(400)
					.expect('Content-Type', /json/)
					.then(response => {
						assert(response.body, {
							message:
								'E-mail address is empty or incorrectly formatted'
						})
					})
			})
		})
		it('POST /login: returns an accessToken when a user logs in', () => {})
		it('POST /login: creates a session with a refreshToken when a user logs in', () => {})
		it('POST /token: refreshes the accessToken if the user has an non-expired refreshToken', () => {})
	})

	describe('account management', () => {
		it('should run', () => {})
	})

	afterAll(async () => {
		await connection.close()
	})
})
