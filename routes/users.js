const router = require('express').Router()
const usersController = require('../controller/admin/users')

router.post('/login', usersController.login)
router.post('/register', usersController.register)

module.exports = router