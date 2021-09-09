let users
let sessions

module.exports = class UsersDAO {
	static injectDB = async db => {
		if (users && sessions) {
			return
		}
		try {
			users = await db.collection('users')
			sessions = await db.collection('sessions')
		} catch (err) {
			console.error(
				`Could not establish collection handles in userDAO: ${err}`
			)
		}
	}

	static addUser = async (email, hash) => {
		try {
			await users.insertOne({ email, password: hash })
			return { success: true }
		} catch (err) {
			console.error(`Failed to register user: ${err}`)
			return { error: err }
		}
	}

	static getUser = async email => {
		return await users.findOne({ email })
	}

	static deleteUser = async email => {
		try {
			const deleteUserResult = await users.deleteOne({ email })
			const deleteSessionResult = await sessions.deleteOne({ email })
			if (deleteUserResult.deletedCount === 1) return { success: true }
			return { success: false }
		} catch (err) {
			console.error(`Failed to logout user: ${err}`)
			return { error: err }
		}
	}

	static updateEmail = async (currentEmail, newEmail) => {
		try {
			const updateUserResult = await users.updateOne(
				{
					email: currentEmail
				},
				{ $set: { email: newEmail } }
			)
			const updateSessionResult = await sessions.updateOne(
				{
					email: currentEmail
				},
				{ $set: { email: newEmail } }
			)
			console.log(updateSessionResult)
			if (
				updateUserResult.modifiedCount === 1 &&
				updateSessionResult.modifiedCount === 1
			)
				return { success: true }
			return { success: false }
		} catch (err) {
			console.error(`Failed to update email: ${err}`)
			return { error: err }
		}
	}
}
