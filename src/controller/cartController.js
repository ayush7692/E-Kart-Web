const Cart = require("../model/cartmodel")
const Product = require("../model/productmodel")

const getCart = async(req,res)=>{

    const userId = req.user._id

    const cart = await Cart.findOne({user:userId}).populate("products.product")

    if(!cart){
       res.status(404)
       throw new Error('Cart is Empty...')
    }
    res.status(200).json(cart.products)

}

const addToCart = async(req,res)=>{
    const userId = req.user._id
    const productId = req.params.pid

    if(!productId){
        res.status(400)
        throw new Error('Provide product')
    }

    const productExist = await Product.findById(productId)
    if(!productExist){
        res.status(404)
        throw new Error('product not available')
    }

   
    // create new Cart
    let cart = await Cart.findOne({user:userId})
    if(!cart){

        cart = await Cart.create({
            user:userId,
            products :[{product:productId, qty:1}]
        })
    }else{
      let existingCart = cart.products.find(
        (item) => item.product.toString() == productId,
      );

      if (existingCart) {
        const newQty = existingCart.qty + 1;

        if(newQty > productExist.stock) {
          res.status(400)
          throw new Error("insufficient stock");
        }

        existingCart.qty = newQty;
      }else{
       
        cart.products.push({product:productId, qty:1 })

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

const increaseItem =  async(req,res)=>{
    const userId = req.user._id
    const productId = req.params.pid


   
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
    
    let cartItem  = cart.products.find((item)=> item.product.toString()==productId)

       if(cartItem){
        if(productExist.stock < cartItem +1 ){
            res.status(409)
            throw new Error('insufficient stock')
        }

         cartItem.qty += 1

       }

        await cart.save()
        await cart.populate('products.product')

      res.status(200).json(cart)

}

const decreaseItem =  async(req,res)=>{
    const userId = req.user._id
    const productId = req.params.pid
   
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
    
    let cartItem  = cart.products.find((item)=> item.product.toString()==productId)

       if(cartItem){
        if(!productExist.stock){
            res.status(409)
            throw new Error('insufficient stock')
        }
         cartItem.qty -= 1

       }

        await cart.save()
        await cart.populate('products.product')

      res.status(200).json(cart)

}

const removeCartItem =  async(req,res)=>{
    const userId = req.user._id
    const productId = req.params.pid
   
    const cart = await Cart.findOne({user:userId})
    if(!cart){
        res.status(400)
        throw new Error('cart not found')
    }
    cart.products = cart.products.filter((item)=> item.product.toString()!==productId)

    await cart.save()
    


    res.status(200).json({id:req.params.pid})

}

module.exports = {getCart,addToCart,increaseItem,decreaseItem,clearCart,removeCartItem}


a