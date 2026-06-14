const Product = require("../model/productmodel")

const getAllProducts = async(req,res)=>{

    const products = await Product.find({isActive:true})   

    if(!products){
        throw new Error('No products found')
    }
    res.status(200).json({
        products
    })}


const getProduct = async(req,res)=>{

    const productId = req.params.pid

    const products = await Product.findOne({_id:productId,isActive:true})   

    if(!products){
        throw new Error('No products found')
    }
    res.status(200).json({
        products
    })}



    module.exports ={getAllProducts,getProduct}