const UsersDAO = require('../dao/usersDAO')

module.exports = {
	delete: async (req, res) => {
        const email = res.locals.email
        if (!email) return res.sendStatus(400)
		const { success } = await UsersDAO.deleteUser(email)
		if (success)
			return res.status(200).send({
				message: `Successfully deleted user: ${email}`,
			})
		return res.sendStatus(404)
	},
	update: async (req, res) => {
		const currentEmail = res.locals.email
		const newEmail = req.body.email
		const result = await UsersDAO.updateEmail(currentEmail, newEmail)
		if (result.success === true) return res.status(201).send({ message: `Successfully updated email address to ${newEmail}`})
		return res.status(400).send({message: 'bad request'})
	},
}
