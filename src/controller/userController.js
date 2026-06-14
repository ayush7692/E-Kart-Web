const Address = require("../model/adressmodel")




const updateMyAddress = async(req,res)=>{
    const {name,steet,city,pinCode,country} = req.body
    const userId = req.user
    console.log(req.body)
    if(pinCode.length>6){
        throw new Error('Pincode cant be more than 6 digit')
    }

    const user = await User.findById(userId)
    if(!user){
        res.status(404)
        throw new Error('luser not found')
    }
    console.log(user)
    const updatedAddress = await Address.findByIdAndUpdate(user._id,{
        name,
        street,
        city,
        pinCode,
        country
    })
    if(!updatedAddress){
        throw new Error("address not update")
    } 

     res.status(200).json({
        updatedAddress
    })
}

const addAddress = async(req,res)=>{

    const {name,street,city,pinCode,country} = req.body
    const userId = req.user

    if(!name||!street||!city||!pinCode||!country){
        res.status(401)
        throw new Error("Fill all the detail")
    }
    if(pinCode.length>6){
        throw new Error('Pincode cant be more than 6 digit')
    }

    const user = await User.findById(userId)
    if(!user){
        res.status(404)
        throw new Error('luser not found')
    }

    const address = await Address.create({
        user:user._id,
        name,
        street,
        city,
        pinCode,
        country
    })

    if(!address){
        throw new Error("address not created")
    }

    res.status(200).json({
        address
    })
}



module.exports = {addAddress,updateMyAddress}