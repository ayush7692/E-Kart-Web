const { default: mongoose } = require("mongoose");
const Vendor = require("./vendorModel");

const productSchema = new mongoose.Schema({
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required: true
    },
    name:{
        type: String,
        required:[true,"Product name is required"],
    },
    description :{
        type: String,
        required:[true,"Desc is required"],
    },
    category:{
        type: String,
        required:[true,"category is required"],
    },
    stock:{
        type: Number,
        required:[true,"stock detail is required"],
    },
    price:{
        type: Number,
        required:[true,"price detail is required"],
    },
    image:{
        type: String
    },
    isActive:{
        type: Boolean,
        required:true,
        default : true  
    },
},{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
