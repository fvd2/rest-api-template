let users

module.exports = class UsersDAO {
	static injectDB = async conn => {
		if (users) {
			return
		}
		try {
			users = await conn.db(process.env.MONGO_DB_NAME).collection('users')
		} catch (err) {
			console.error(
				`Could not establish collection handles in userDAO: ${e}`
			)
			return { error: err }
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
			const { deletedCount } = users.deleteOne({ email })
			if (deletedCount === 1) return { success: true }
			return { success: false }
		} catch (err) {
			console.error(`Failed to logout user: ${err}`)
			return { error: err }
		}
	}

	static updateEmail = async email => {
		const { modifiedCount } = users.updateOne({
			filter: { email: { $in: [email] } },
			options: { $set: { email: email } }
		})
        if (modifiedCount === 1) return { success: true }
        return { success: false }
	}
}
