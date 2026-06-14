const express = require('express')
const { getVendors, getMyProducts, getMyProduct, addProduct, updateProduct } = require('../controller/vendorController')
const { forVendor } = require('../Middleware/authHandler')


const router = express.Router()

router.get('/',getVendors)
router.get('/products',forVendor,getMyProducts)
router.get('/products/:pid',forVendor,getMyProduct)


router.post('/products',forVendor,addProduct)
router.put('/products/:pid',forVendor,updateProduct)



module.exports = router
