const express = require('express')
const { addProduct, updateProduct } = require('../controller/vendorController')
const { forUser } = require('../Middleware/authHandler')


const router = express.Router()



router.post('/products',forUser,addProduct)
router.put('/products/:pid',forUser,updateProduct)



module.exports = router
