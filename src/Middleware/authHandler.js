const jwt = require("jsonwebtoken")
const User = require("../model/usermodel")
const Vendor = require("../model/vendorModel")


const forUser = async(req,res,next)=>{
    // console.log(req)
    let token
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

            token = req.headers.authorization.split(' ')[1]
            if (!token) {
                throw new Error("token is unavailable")
            }
            // console.log(token)
            let decode = jwt.verify(token,process.env.SECRET_KEY)
        

            const user = await User.findById(decode.id)
            // console.log(user)
            if(!user){
                throw new Error('user not found')
            }

            req.user  = user
            next()
        }

    } catch (error) {
        res.status(401)
        throw new Error("Unauthorise Access")
    }
}

const forVendor = async(req,res,next)=>{

    let token
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

            token = req.headers.authorization.split(' ')[1]
            if (!token) {
                throw new Error("token is unavailable")
            }

            let decode = jwt.verify(token,process.env.SECRET_KEY)

            const vendor = await Vendor.findById(decode.id)

            if(!vendor){
                throw new Error('vendor not found')
            }

            req.vendor  = vendor
            next()
        }

    } catch (error) {
        res.status(401)
        throw new Error("Unauthorise Access")
    }
}


module.exports = {forUser,forVendor}