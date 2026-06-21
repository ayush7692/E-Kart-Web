
const express = require('express')
const { getCart, addToCart, clearCart, increaseItem, decreaseItem, removeCartItem } = require('../controller/cartController')
const { forUser } = require('../Middleware/authHandler')

const router = express.Router()

router.get('/',forUser,getCart)     
router.post('/:pid',forUser,addToCart)
router.put('/increase/:pid',forUser,increaseItem)
router.put('/decrease/:pid',forUser,decreaseItem)
router.put('/remove/:pid',forUser,removeCartItem)
router.delete('/',clearCart)


module.exports = router