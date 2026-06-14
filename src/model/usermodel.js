const express = require('express')
const { default: mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
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
    refreshToken: {
      type: String,
      default: ''
    }
},{
    timestamps: true
})


const User = mongoose.model("User", userSchema)

module.exports = User

