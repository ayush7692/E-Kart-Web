const { default: mongoose } = require("mongoose");
const User = require("./usermodel");


const vendorSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required:[true,"name is required"],
        maxLength:25,
    },
    email:{
        type: String,
        unique: true,
        required:[true,"email is required"],
        trim : true
    },
    phone:{
        type: Number,
        unique: true,
        spare: true
    },
    password:{
        type : String,
        trim : true,
        required:[true,"password is required"]

    },
    isActive:{
        type:Boolean,
        required: true,
        default: true
    }
},{
    timestamps: true
})

const Vendor = mongoose.model('Vendor',vendorSchema)

module.exports = Vendor