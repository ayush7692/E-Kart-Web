const express = require('express')
const { getAllProducts, getProduct } = require('../controller/productController')

const router = express.Router()

router.get('/',getAllProducts)
router.get('/:pid',getProduct)

module.exports = router