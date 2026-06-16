require('dotenv').config()
const jwt = require('jsonwebtoken');

const generateRefreshToken = (id)=>{
    return token = jwt.sign({id},process.env.SECRET_KEY,{expiresIn: "7d"})
}

const generateAccessToken = (id)=>{
    return token = jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"10d"})
}


module.exports = {generateAccessToken,generateRefreshToken}