const { default: mongoose } = require("mongoose");
const User = require("./usermodel");


const vendorSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    companyName:{
        type: String,
        unique:true,
        required:[true,"company name is required"],
    },
    ownerName:{
        type: String,
        required:[true,"owner name is required"],
    },
    contactEmail:{
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