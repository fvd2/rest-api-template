const AuthController = require('../controllers/AuthController')
const router = require('express').Router()

router.post('/register', AuthController.register)
router.post('/token', AuthController.token)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

module.exports = router
