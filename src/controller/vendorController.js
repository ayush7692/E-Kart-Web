const Product = require("../model/productmodel");
const User = require("../model/usermodel");
const Vendor = require("../model/vendorModel");


const addProduct = async(req,res)=>{

    const {name,description,category,stock} = req.body
    const userId = req.user._id

    if(!name ||!description || !category || !stock ){
        res.status(400)
        throw new Error(" Fill all the detail ") }

    const vendor = await User.findOne({_id:userId,role:{ $in:['vendor'] }})

    const product = await Product.create({
        vendor:vendor._id,
        name,
        description,
        category,
        stock
    })  
    
    if(!addProduct){
        res.status(409)
        throw new Error("product not added")
    }

    res.status(201).json(product)
}

const updateProduct = async(req,res)=>{
    const {name,description,category,stock} = req.body
    const vendorId = req.vendor._id
    const productId = req.params.pid

    const allowedField = ["name","description","category","stock"]  

    if(!allowedField.includes(req.body)){
        res.status(409)
        throw new Error("Entry not allowed")
    }

    const productExist = await Product.findById(productId)
    if(!productExist){
        res.status(404)
        throw new Error("product not found")
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId,
       { $set:{name,description,category,stock}},
        {new:true}
    )
    if(!updateProduct){
        res.status(401)   
        throw new Error("product not update")
    }
    res.status(201).json({
        name:updatedProduct.name,
        description:updatedProduct.description,
        category:updatedProduct.category,
        stock:updatedProduct.stock
    })

}



module.exports = {addProduct,updateProduct}

