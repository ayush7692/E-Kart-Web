
const express = require('express')
const { getCart, addToCart, clearCart, updateCart } = require('../controller/cartController')
const { forUser } = require('../Middleware/authHandler')

const router = express.Router()

router.get('/',forUser,getCart)
router.post('/:pid',forUser,addToCart)
router.put('/',forUser,updateCart)
router.delete('/',forUser,clearCart)


module.exports = router