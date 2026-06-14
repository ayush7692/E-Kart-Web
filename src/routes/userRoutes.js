const express = require('express')
const { addAddress, updateMyAddress } = require('../controller/userController')
const { forUser } = require('../Middleware/authHandler')


const router = express.Router()

router.post('/address',forUser,addAddress)
router.put('/addres',forUser,updateMyAddress)

module.exports = router