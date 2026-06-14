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
    },
    street:{
        type : String,
        required: true
    },
    city:{
        type : String,
        required: true
    },
    pinCode:{
        type : Number,
        required: true
    },
    country:{
        type : String,
        required: true
    }
},{
    timestamps:true
})

const Address = mongoose.model("Address", addressShema)

module.exports = Address