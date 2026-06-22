const { default: mongoose } = require("mongoose");
const User = require("./usermodel");


const addressShema = new mongoose.Schema({

    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name:{
        type : String,
        required: true,
        tirm: true
    },
    street:{
        type : String,
        required: true,
        trim: true
    },
    city:{
        type : String,
        required: true,
        trim: true
    },
    pinCode:{
        type : Number,
        required: true
    },
    phone:{
        type : Number,
        required: true
    },
    state:{
        type : String,
        required: true,
        trim: true
    },
    email:{
        type : String,
        required: true,
        tirm: true
    },
    country:{
        type : String,
        required: true,
        default: "India"
    },
    isDefault:{
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})

const Address = mongoose.model("Address", addressShema)

module.exports = Address