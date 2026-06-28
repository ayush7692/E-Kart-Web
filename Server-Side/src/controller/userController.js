const Address = require("../model/adressmodel")
const User = require("../model/usermodel")




const updateMyAddress = async(req,res)=>{
    const {name,street,city,pinCode,country,email,phone,state} = req.body
    const aid = req.params.aid
    const userId = req.user._id
    
    if(pinCode.length>6){
        throw new Error('Pincode cant be more than 6 digit')
    }

    const user = await User.findById(userId)
    if(!user){
        res.status(404)
        throw new Error('luser not found')
    }

    const updatedAddress = await Address.findByIdAndUpdate(aid,{
        name:name,
        street:street,
        city:city,
        pinCode:pinCode,
        country,
        email:email,
        phone:phone,
        state:state
    })
    if(!updatedAddress){
        throw new Error("address not update")
    } 

     res.status(200).json(updatedAddress)
}

const addAddress = async(req,res)=>{

    const {name,street,city,pinCode,country,email,phone,state,isDefault} = req.body
    const userId = req.user._id
 

    if(!name||!street||!city||!pinCode||!phone||!state||!email){
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

    const updated = await Address.updateMany({},{
        $set:{isDefault:false}
    })  


    const address = await Address.create({
        user:user._id,
        name,
        street,
        city,
        pinCode,
        country,
        state,
        phone,
        email,
        isDefault
    })

    if(!address){
        throw new Error("address not created")
    }

    res.status(200).json([address])
}
const getAddress = async(req,res)=>{
    const userId = req.user._id

    const myAddress = await Address.find({user:userId})
    if(!myAddress){
        res.status(404)
        throw new Error('No Address found')
    }
 
    res.status(200).json(myAddress)

}



module.exports = {addAddress,updateMyAddress,getAddress}