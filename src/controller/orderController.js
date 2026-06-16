const Cart = require("../model/cartmodel")

const createOrder = async(req,res)=>{
    const userId = req.user

    const cart = await Cart.findOne({user:userId}).populate('products.product')
    if(!cart){
        res.status(404)
        throw new Error('cart not available')
    }

    const bill = cart.products.map((item)=>{
        return{
            product : item.product._id,
            qty : item.qty,
            price : item.product.price
        }
    })

    let totalBill = bill.reduce((acc,item)=>{
        return acc+item.qty*item.price
    },0)

     const useraddress = await User.findById(userId).populate("address")

    const order = await Order.create({
        user:userId,
        totalBillAmount: totalBill,
        address:useraddress,
        status:"placed"
 })
    

}
const getMyOrder = async(req,res)=>{
    res.send('order created')
}








module.exports = { createOrder, getMyOrder }