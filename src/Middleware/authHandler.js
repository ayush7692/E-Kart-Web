const jwt = require("jsonwebtoken")
const User = require("../model/usermodel")
const Vendor = require("../model/vendorModel")


const forUser = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(' ')[1]

            if (!token || token === "undefined" || token === "null") {
                return res.status(401).json({
                  message: "Token is unavailable" 
                })
            }

            const decode = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findById(decode.id)

            if (!user) {
                return res.status(401).json({ 
                    message: "User not found" 
                })
            }

            req.user = user
            return next()
        }

        return res.status(401).json({ 
            message: "Unauthorized: no token provided" 
        })

    } catch (error) {
        return res.status(401).json({ 
            message: "Unauthorized access", 
            error: error.message 
        })
    }
}



module.exports = {forUser}