const express = require('express')
const { addAddress, updateMyAddress, getAddress } = require('../controller/userController')
const { forUser } = require('../Middleware/authHandler')


const router = express.Router()
router.get('/address',forUser,getAddress)
router.post('/address',forUser,addAddress)
router.put('/address/:aid',forUser,updateMyAddress)

module.exports = router