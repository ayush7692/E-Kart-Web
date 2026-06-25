const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./config/db')
const errorHandler = require('./Middleware/errorHandler')
const cors = require('cors')



const PORT = process.env.PORT || 3000
// MiddleWare 
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: ["http://localhost:5001", "http://localhost:5173"], // Added common Vite port too
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

connectDB()

// All Routes Import 
const authrouter = require('./routes/authRoutes')

const productrouter = require('./routes/productRoutes')
const vendorRouter = require('./routes/vendorRoutes')
const userRouter = require('./routes/userRoutes')
const cartRouter = require('./routes/cartRoutes')
const orderRouter = require('./routes/orderRoutes')

// API Testing
app.get('/',(req,res)=>{
    res.send("API is working")
})



// All Routes
app.use('/api/auth',authrouter)
app.use('/api/products',productrouter)
app.use('/api/vendor',vendorRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)








app.use(errorHandler)


module.exports = app