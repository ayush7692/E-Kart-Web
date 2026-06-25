const express = require('express')
const { default: mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
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
        required:[true,"provide phone number"]
    },
    password:{
        type : String,
        trim : true,
        required:[true,"password is required"]

    },
    role:{
        type:String,
        enum:["user","vendor"],
        default:"user"
    },
    refreshToken: {
      type: String,
      default: ''
    }
},{
    timestamps: true
})


const User = mongoose.model("User", userSchema)

module.exports = User

