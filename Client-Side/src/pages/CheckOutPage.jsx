import React, { useEffect, useState } from "react";
import { getAddress } from "../features/slice/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { createOrders } from "../features/slice/orderSlice";
import { Link, Links, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Checkout = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {address,errorMessage} = useSelector(store=> store.address)
  const {cartItem} = useSelector(store=> store.cart)
  const {orderConfirmed,OrdererrorMessage}= useSelector(store=>store.order)

  const totalItem = cartItem.reduce((acc, item) => acc + item.qty, 0);

  const subtotal = cartItem.reduce(
    (acc, item) => acc + item?.product?.price * item?.qty,
    0,
  );

  console.log(address)

  useEffect(() => {
    if(!errorMessage){
      dispatch(getAddress());
   }
    if (errorMessage) {
      toast.error(errorMessage);
    }
    
  }, [errorMessage]);
  


  const handlePlaceOrder = () => {
    dispatch(createOrders());
    setTimeout(() => {
      navigate("/order");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
  
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-6">
     
          <div className="md:col-span-2 md:row-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-800">
                Shipping Address
              </h2>

              <Link to={'/addAddress'} className="text-blue-800 font-medium hover:underline">
                {address?"Update Address" : "Add Address"}

              </Link>
            </div>

           {
            address?.filter((item)=>item?.isDefault===true||item?.isDefault==="true" ).map((item)=>(
                
              <div key={item?._id}
               className="bg-blue-50 border border-blue-100 rounded-lg p-5 mt-15 max-h-80">
              <h3 className="text-lg font-bold text-blue-800">
                {item?.name}
              </h3>

              <p className="text-gray-700 mt-2">{item?.street}</p>

              <p className="text-gray-700">
                {item?.city}, {item?.state} -{"india "}
                
              </p>

              <div className="mt-4 space-y-1">
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span>{" "}
                  {item?.phone}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">PinCode:</span>{" "}
                  {item?.pinCode}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Email:</span>{" "}
                  {item?.email}
                </p>
              </div>
            </div>
            ))
           }
          </div>

  
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold text-blue-800 mb-5">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalItem}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">
                  free
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold text-blue-800">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition hover:cursor-pointer"
            >
              Place Order
            </button>
          </div>
     
           <div className=" bg-white rounded-xl shadow-md p-6 h-fit md:col-start-3">
            <h2 className="text-xl font-bold text-blue-800 mb-5">
              Prducts
            </h2>
            <div className="flex flex-col gap-4 h-65 overflow-y-auto pr-2">
                {
                  cartItem?.map((item)=>(
                  <div key={item?.product?._id}
                   className="font-medium border rounded border-gray-400 p-2 px-5 ">
                  <h3>{item?.product?.name}</h3>
                   <hr />
                    <h3 className="font-normal">Qty- {item?.qty} </h3> 
                    <h3 className="font-normal">Price - <span className="text-green-600">{item?.product?.price}</span> </h3>
                </div>
                  ))
                }
                
            </div>

          </div>
        {orderConfirmed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-3 text-center">
            <div className="w-60 h-60 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-blue-800">Order Placed!</h2>
            <p className="text-gray-500 text-sm">Redirecting you to your orders...</p>
          </div>
        </div>
      )}

       </div>
        </div>
      </div>
  
  );
};

export default Checkout;