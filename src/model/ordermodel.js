const { default: mongoose, mongo } = require("mongoose");
const Product = require("./productmodel");


const orderShema = new mongoose.Schema({
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products:[{
        product:{
            type :mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required: true
        },
        purchasedPrice:{
            type:Number,
            required: true
        },
        qty:{
            type:Number,
            required: true,
            default:[1,"atleast 1 qty need"]
        },
        _id: false
    }],
    status:{
        type: String,
        required: true,
        enum :["placed","cancelled","dispatch","delivered"]
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required: true
    },
    totalBillAmount:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Order = mongoose.model("Order",orderShema)

module.exports = Order

