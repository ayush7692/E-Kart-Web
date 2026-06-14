const Vendor = require("../model/vendorModel");


const vendorRegister = async(req,res)=>{

    const {companyName,email,phone,password}= req.body

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

    const   vendorExist = await Vendor.findOne({email:email})

    if(vendorExist){
        res.status(409)
        throw new Error("vendor already exist")
    }
    
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password,salt)


    const vendor = await Vendor.create({
        name,
        email,
        phone,
        password : hashedPassword
    })

    if(vendor){
    
        const accessToken =generateAccessToken(vendor._id);
       

        res.status(201).json({
        vendorId : vendor._id,
        name:vendor.name,
        phone: vendor.phone,
        email: vendor.email,
        createdAt: vendor.createdAt,
        accessToken
    })
    }else{
        res.status(400)
        throw new Error("Ivalid vendor data ")
    }
}


const vendorLogin = async(req,res)=>{
    const {email,password}= req.body

    if(!email || !password){
        res.status(400)
        throw new Error( " Fill all the detail ") 
    }

    const vendor = await Vendor.findOne({email:email})
    if(!vendor){
        res.status(404)
        throw new Error('Invalid Credential')
    }
    const validPassword = await bcrypt.compare(password,vendor.password)

    if(validPassword){

        const accessToken = generateAccessToken(vendor._id)

        

        res.status(201).json({
            vendorId : vendor._id,
            name:vendor.name,
            phone: vendor.phone,
            email: vendor.email,
            createdAt: vendor.createdAt,
            accessToken
        })
    }else{
        res.status(404).json({
            message: "inavalide Credential"
        })
    }

}