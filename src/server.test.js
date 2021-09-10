const request = require('supertest')
const app = require('./server')
const { MongoClient } = require('mongodb')
const usersDAO = require('./dao/usersDAO')
const authDAO = require('./dao/authDAO')
const assert = require('assert/strict')
const { describe, beforeEach } = require('jest-circus')

describe('insert', () => {
	let connection
	let db
	let credentials
	let refreshToken
	let accessToken

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

	beforeEach(async () => {
		await db.collection('sessions').deleteMany({})
		await db.collection('users').deleteMany({})
	})

	describe('/auth/ - jwt authentication', () => {
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
						assert.deepEqual(response.body, { success: true })
					})
			})
			it('Throws an error if an invalid email address is submitted', () => {
				return request(app)
					.post('/auth/register')
					.send({
						email: 'bibsieXgmail.com',
						password: 'haasdasdll23'
					})
					.expect(400)
					.expect('Content-Type', /json/)
			})
			it('Throws an error if an invalid password (< 8 chars) is submitted', () => {
				return request(app)
					.post('/auth/register')
					.send({
						email: 'test@gmail.com',
						password: 'has8k'
					})
					.expect(400)
					.expect('Content-Type', /json/)
			})
		})

		describe('POST /auth/login', () => {
			it('Returns an accessToken when a user logs in', () => {
				credentials = {
					email: 'testsasdasasdwdassdasdwd@gmail.com',
					password: 'appelasds123'
				}

				return request(app)
					.post('/auth/register')
					.send(credentials)
					.expect(201)
					.then(() => {
						request(app)
							.post('/auth/login')
							.send(credentials)
							.expect(200)
							.then(res => {
								assert.strictEqual(
									Object.keys(res.body)[0],
									'accessToken'
								)
								refreshToken = res.header['set-cookie']
								accessToken = res.body.accessToken
							})
					})
			})
		})

		describe('POST /token', () => {
			it('Refreshes the accessToken if the user has an non-expired refreshToken', async () => {
				return await request(app)
					.post('/auth/token')
					.set('Authorization', 'bearer ' + accessToken)
					.then(res => {
						assert.strictEqual(
							Object.keys(res.body)[0],
							'accessToken'
						)
					})
			})
		})

		describe('POST /logout', () => {
			it('Removes the active session upon logout', () => {
				return request(app)
					.post('/auth/logout')
					.set('Cookie', refreshToken[0].split(';')[0])
					.expect(200)
					.then(res => {
						request(app)
							.post('/auth/logout')
							.set('Authorization', accessToken)
							.expect(404)
					})
			})
		})
	})

	describe('/user/ - user account management', () => {
		const registerAndLogin = async credentials => {
			await request(app)
				.post('/auth/register')
				.send(credentials)
				.expect(201)

			const loginResponse = await request(app)
				.post('/auth/login')
				.send(credentials)
				.expect(200)
			return loginResponse.body.accessToken
		}
		describe('POST /delete', () => {
			it('Deletes the account of the active user', async () => {
				accessToken = await registerAndLogin({
					email: 'tesewwt@gmail.com',
					password: 'hallo384'
				})
				await request(app)
					.post('/users/delete')
					.set('Authorization', 'bearer ' + accessToken)
					.expect(200)

				return await request(app)
					.post('/auth/login')
					.set('Authorization', 'bearer ' + accessToken)
					.expect(400)
			})
		})

		describe('POST /update', () => {
			it('Updates the email address of the active user to the provided new value', async () => {
				accessToken = await registerAndLogin({
					email: 'oldValue@gmail.com',
					password: 'hallo384'
				})

				const res = await request(app)
                .post('/users/update')
                .set('Authorization', 'bearer ' + accessToken)
                .send({ email: 'BALLSTOTHEWALLS@gmail.com' })
                .expect(201)

                return res
			})
		})
	})

	afterAll(async () => {
		await connection.close()
	})
})
