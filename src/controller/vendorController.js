const Product = require("../model/productmodel");
const User = require("../model/usermodel");
const Vendor = require("../model/vendorModel");


const addProduct = async(req,res)=>{

    const {name,description,category,stock,price,image} = req.body
    const userId = req.user._id

    if(!name ||!description || !category || !stock || ! price ){
        res.status(400)
        throw new Error(" Fill all the detail ") }

    const vendor = await User.findOne({_id:userId,role:{ $in:['vendor'] }})

    const product = await Product.create({
        vendor:vendor._id,
        name,
        description,
        category,
        stock,
        price
    })  
    
    if(!addProduct){
        res.status(409)
        throw new Error("product not added")
    }

    res.status(201).json(product)
}

const updateProduct = async(req,res)=>{
    const {name,description,category,stock,price} = req.body
    const userId = req.user._id
    const productId = req.params.pid

    const allowedField = ["name","description","category","stock"]  

    if(!allowedField.includes(req.body)){
        res.status(409)
        throw new Error("Entry not allowed")
    }

    const vendor = await User.findOne({_id:userId,role:{ $in:['vendor'] }})

   if(vendor){
     const productExist = await Product.findById(productId)
    if(!productExist){
        res.status(404)
        throw new Error("product not found")
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId,
       { $set:{name,description,category,stock,price}},
        {new:true}
    )
    if(!updateProduct){
        res.status(401)   
        throw new Error("product not update")
    }
    res.status(201).json(updatedProduct)
   }else{
        res.status(400).json({
            message : "your not allowed to update product"
        })
   }


   

}



module.exports = {addProduct,updateProduct}

