const express = require('express')
const { userRegister, userLogin, refreshAccessToken, logOut } = require('../controller/authController')

const router = express.Router()

router.post('/register',userRegister)
router.post('/login',userLogin)
router.post('/logout',logOut)
router.post('/refreshToken',refreshAccessToken)





module.exports = router 