const Cart = require("../model/cartmodel")
const Product = require("../model/productmodel")

const getCart = async(req,res)=>{

    const userId = req.user._id

    const cart = await Cart.findOne({user:userId}).populate("products.product" ,"-stock")

    if(!cart){
       res.status(200).json({
        product:[]
       })
    }
    res.status(200).json(cart)

}

const addToCart = async(req,res)=>{
    const userId = req.user._id
    const {productId,qty} = req.body
    const intQty = parseInt(qty)

    if(!productId||!intQty){
        res.status(400)
        throw new Error('Provide product and qty')
    }

    const productExist = await Product.findById(productId)
    if(!productExist){
        res.status(404)
        throw new Error('product not available')
    }

   
    // create new Cart
    let cart = await Cart.findOne({user:userId})
    if(!cart){

         if (intQty > productExist.stock) {
           res.status(400)
           throw new Error("stock is unavailable");
         }

        cart = await Cart.create({
            user:userId,
            products :[{product:productId, qty:intQty}]
        })
    }else{
      let existingCart = cart.products.find(
        (item) => item.product.toString() == productId,
      );

      if (existingCart) {
        const newQty = existingCart.qty + intQty;

        if(newQty > productExist.stock) {
          res.status(400)
          throw new Error("insufficient stock");
        }

        existingCart.qty = newQty;
      }else{
        if(intQty>productExist.stock){
            res.status(400)
            throw new Error('insufficient Stock')
        }
        cart.products.push[{product:productId, qty:intQty}]

      }
        await cart.save()
    }

    await cart.populate('products.product')

    res.status(200).json(cart)
}



const clearCart =  async(req,res)=>{
    const userId = req.user._id
    
    const cart = await Cart.findOneAndDelete({user:userId})

    if(!cart){
        res.status(404)
        throw new Error('cart is found')
    }
    
    res.status(200).json({
        message:"cart cleared"
    })
}

const updateCart =  async(req,res)=>{
    const userId = req.user._id
    const {productId,qty} = req.body
    const intQty = parseInt(qty)
   
    const cart = await Cart.findOne({user:userId})
    if(!cart){
        res.status(400)
        throw new Error('cart not found')
    }

    const productExist = await Product.findById(productId)
    if(!productExist){
        res.status(400)
        throw new Error('product not available')
    }
    
    let cartExist  = cart.products.find((item)=> item.product.toString()==productId)

       if(cartExist){
        if(productExist.stock < intQty){
            res.status(409)
            throw new Error('insufficient stock')
        }

         cartExist.qty = intQty

       }

        await cart.save()
        await cart.populate('products.product','-stock')

      res.status(200).json(cart)

}

// const updateCart = async (req, res) => {
//       const { product, qty } = req.body
//       const userId = req.user._id

//     if ( qty<1 || !product  ) {
//         res.status(409)
//         throw new Error("Please Enter Qty and product")
//     }

//     const productExist = await Product.findById(product)

//     if(qty> productExist.stock){
//         res.status(409)
//         throw new Error("Stock not available")
//     }

//     const cart = await Cart.findOne({user:userId})

//     if(!cart){
//         res.status(404)
//         throw new Error("No cart found")
//     }

//     const productIndex = cart.products.findIndex((item)=>{
//         return item.product.toString() === product
//     })
        
//     if(productIndex === -1){
//         throw new Error("please add product in cart first")

//     }

//          cart.products[productIndex].qty = parseInt(qty)

        
//         if(cart.products[productIndex].qty> productExist.stock){
//             res.status(409)
//             throw new Error("limit exceed")
//         }
    

//     await cart.save()

//     await cart.populate('products.product')

//     res.json(cart)
// }

const removeCartItem =  async(req,res)=>{
    const userId = req.user._id
    const {productId} = req.params.pid
   
    const cart = await Cart.findOne({user:userId})
    if(!cart){
        res.status(400)
        throw new Error('cart not found')
    }
    cart.products = cart.products.filter((items)=> item.product.toString()!==productId)

    await cart.save()
    cart.populate('porducts.product')

    res.status(200).json(cart)

}

module.exports = {getCart,addToCart,updateCart,clearCart,removeCartItem}


