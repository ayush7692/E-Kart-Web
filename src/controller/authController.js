const User = require("../model/usermodel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { generateRefreshToken, generateAccessToken } = require("../utils/token");



const userRegister = async(req,res)=>{

    const {name,email,phone,password}= req.body

    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!name || !email || !phone || !password){
        res.status(400)
        throw new Error(" Fill all the detail ") 
    }else if(!nameRegex.test(name)){
        throw new Error("Don't use special character or number in name ")
    }else if (!emailRegex.test(email)){
        throw new Error("Provide a valide email id")
    }else if(phone.length>10 || phone.length<10){
        throw new Error("Provide valid Number")
    }

    const userExist = await User.findOne({email:email})

    if(userExist){
        res.status(409)
        throw new Error("User already exist")
    }
    
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password,salt)


    const user = await User.create({
        name,
        email,
        phone,
        password : hashedPassword
    })

    if(user){
        const refreshToken = generateRefreshToken(user._id)
        const accessToken =generateAccessToken(user._id);
       

        await User.findByIdAndUpdate(user._id,{refreshToken:refreshToken})


        res.status(201).json({
        userId : user._id,
        name:user.name,
        phone: user.phone,
        email: user.email,
        createdAt: user.createdAt,
        accessToken,
        refreshToken
    })
    }else{
        res.status(400)
        throw new Error("Ivalid user data ")
    }
}

const userLogin = async(req,res)=>{
    const {email,password}= req.body

    if(!email || !password){
        res.status(400)
        throw new Error( " Fill all the detail ") 
    }

    const user = await User.findOne({email:email})
    if(!user){
        res.status(404)
        throw new Error('Invalid Credential')
    }
    const validPassword = await bcrypt.compare(password,user.password)

    if(validPassword){
        const refreshToken = generateRefreshToken(user._id)
        const accessToken = generateAccessToken(user._id)

        await User.findByIdAndUpdate(user._id,{refreshToken:refreshToken})

        res.status(201).json({
            userId : user._id,
            name:user.name,
            phone: user.phone,
            email: user.email,
            createdAt: user.createdAt,
            accessToken,
            refreshToken
        })
    }else{
        res.status(404).json({
            message: "inavalide Credential"
        })
    }

}


const refreshAccessToken = async(req,res)=>{

    const {refreshToken} = req.body

    let decoded
    try{
        decoded = jwt.verify(refreshToken,process.env.SECRET_KEY)
    }catch(err){
        res.status(401)
        throw new Error("Expired Token or Invalide token")
    }

    const user = await User.findById(decoded.id)
    if(!user){
        res.status(404)
        throw new Error("user not found")
    }

    if(user.refreshToken !== refreshToken){
        res.status(401);
       throw new Error('Refresh token expired or is invalid');
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);
    
    user.refreshToken = newRefreshToken
    await user.save()

    res.status(201).json({
        newAccessToken,
        newRefreshToken
    })


}



module.exports = {userRegister,userLogin,refreshAccessToken}