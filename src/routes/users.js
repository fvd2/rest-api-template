const UserController = require('../controllers/UserController')
const validateToken = require('../middlewares/validateToken')
const isAdmin = require('../middlewares/isAdmin')

const router = require('express').Router()

router.post('/delete', validateToken, UserController.delete)
router.post('/update', validateToken, UserController.update)

module.exports = router
