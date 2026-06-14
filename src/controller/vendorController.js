const getMyProducts = async(req,res)=>{
    res.send("getMy product")
}
const getMyProduct = async(req,res)=>{
    res.send("getMy product")
}


const addProduct = async(req,res)=>{
    res.send("add product")
}

const updateProduct = async(req,res)=>{
    res.send("update product")
}

const getVendors =  async(req,res)=>{
    res.send("get vendor")
}


module.exports = {getMyProducts,getMyProduct,addProduct,updateProduct,getVendors}

// getMyOrder,getUserOrder,updateOrder