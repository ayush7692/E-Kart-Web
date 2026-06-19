
const express = require('express')
const { getCart, addToCart, clearCart, increaseItem, decreaseItem, removeCartItem } = require('../controller/cartController')
const { forUser } = require('../Middleware/authHandler')

const router = express.Router()

router.get('/',forUser,getCart)     
router.post('/',forUser,addToCart)
router.put('/increase/:pid',increaseItem)
router.put('/decrease/:pid',decreaseItem)
router.put('/remove/:pid',removeCartItem)
router.delete('/',forUser,clearCart)


module.exports = router