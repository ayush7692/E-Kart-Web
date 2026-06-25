import { useState } from 'react'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import MyOrders from './pages/Order'
import Checkout from './pages/CheckOutPage'
import PrivateComponent from './components/PrivateComponent'
import toast, { Toaster } from 'react-hot-toast';
import AddAddress from './pages/Address'
import PrivateComponentVendor from './components/privateComponentVendor'
import AddProduct from './pages/AddProduct'

function App() {


  return (
    <>
    
     <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:pid" element={<ProductDetail />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Login" element={<Login/>} /> 
              <Route element={<PrivateComponent/>}>
                   <Route path="/cart" element={<Cart />} />
                   <Route path="/order" element={<MyOrders />} />
                   <Route path="/checkOut" element={<Checkout />} />
                   <Route path='/addAddress' element={<AddAddress/>} />
              </Route>
              <Route element={<PrivateComponentVendor/>}>
                    <Route path="/addProduct" element={<AddProduct/>} />
              </Route>
            </Routes>
          </main>
          <footer className="border-t border-gray-500 bg-white py-6 text-center text-xs font-mono text-black">
            E-KART APP 2026
          </footer>
        </div>
      </Router>
      <Toaster /> 
    </>
  )
}

export default App
