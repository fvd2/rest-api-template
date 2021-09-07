const db = require('../controllers/DbController')

module.exports = async (req, res, next) => {
	const userData = await db.findOne('users', {
		filter: { email: { $in: [res.locals.email] } },
		options: { projection: { isAdmin: 1 } }
	})
    if (userData == null) return res.sendStatus(404)
    res.locals.isAdmin = userData.isAdmin
    next()
}