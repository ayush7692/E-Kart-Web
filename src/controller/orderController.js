const Address = require("../model/adressmodel")
const Cart = require("../model/cartmodel")
const Order = require("../model/ordermodel")
const User = require("../model/usermodel")

const createOrder = async(req,res)=>{
    const userId = req.user._id


    const user = await User.findById(userId).select('name phone email')

    const cart = await Cart.findOne({user:userId}).populate('products.product')
    if(!cart){
        res.status(404)
        throw new Error('cart not available')
    }
    const product = cart.products
    const bill = cart.products.map((item)=>{
        return{
            product : item.product._id,
            qty : item.qty,
            purchasedPrice : item.product.price
        }
    })

    let totalBill = bill.reduce((acc,item)=>{
        return acc+item.qty*item.purchasedPrice
    },0)

    const useraddress = await Address.findOne({user:userId,default:true})

    if(!useraddress){
        res.status(404)
        throw new Error('please add address first')
    }

    const order = await new Order({
        user:user,
        totalBillAmount: totalBill,
        products: bill,
        address:useraddress,
        status:"placed"
 })
        await order.save()
        await order.populate('products.product','name category')
    res.status(200).json(order)

}
const getMyOrder = async(req,res)=>{
    const userId = req.user._id
  

    const order  = await Order.find({user:userId}).populate('user','name email phone').populate('address').populate('products.product','name category').sort({createdAt:-1})
    if(!order){
        res.status(400)
        throw new Error('no order found')
    }

    res.status(200).json(order)
}


module.exports = { createOrder, getMyOrder }