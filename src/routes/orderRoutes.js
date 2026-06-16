const express = require('express')
const { getMyOrder, createOrder } = require('../controller/orderController')
const { forUser } = require('../Middleware/authHandler')

const router = express.Router()

router.get('/',forUser,getMyOrder)
router.post('/',forUser,createOrder)

module.exports = router