const UsersDAO = require('../dao/usersDAO')

module.exports = {
	delete: async (req, res) => {
        const email = req.query.email
        if (!email) return res.sendStatus(400)
		const result = await UsersDAO.deleteUser({ email: res.locals.email })
		if (result.success)
			return res.status(200).send({
				message: `Successfully deleted user: ${req.query.email}`,
			})
		return res.sendStatus(404)
	},
	update: async (req, res) => {
		const email = req.query.email
		const result = await UsersDAO.updateEmail(email)
		if (result.success) return res.status(200).send({ message: 'Successfully updated email address'})
     	return res.status(400).send({message: 'bad request'})
	},
}
