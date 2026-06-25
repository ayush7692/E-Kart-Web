
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseItem, getCart, increaseItem, removeItem } from "../features/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {

  const image =  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  const navigate = useNavigate()
  const dispatch = useDispatch()

 const {cartItem} = useSelector(store=> store.cart)
  
  const increaseQty = (_id)=>{
      dispatch(increaseItem(_id))
  }

  const decreaseQty = (_id)=>{
      dispatch(decreaseItem(_id))
  }


  const removeItems = (_id) => {
      dispatch(removeItem(_id))
  };

  const totalItem = cartItem.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const subtotal = cartItem.reduce(
    (acc, item) => acc + item?.product?.price * item.qty,
    0
  );

    useEffect(()=>{
    dispatch(getCart())
    },[])

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          Shopping Cart
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
    
          <div className="md:col-span-2 bg-white rounded-lg shadow">
            {cartItem?.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Cart is Empty
              </div>
            ) : (
              cartItem?.map((item) => (
                <div
                  key={item?.product._id}
                  className="flex gap-4 p-4 border-b"
                >
                  <img
                    src={image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">
                      {item?.product?.name} 
                    </h2>

                    <p className="text-blue-700 font-medium">
                      ₹{item?.product?.price}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        disabled={item?.qty==1}
                        onClick={() => decreaseQty(item?.product?._id)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        {item?.qty}
                      </span>

                      <button
                        onClick={() => increaseQty(item?.product?._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeItems(item?.product?._id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>

                    <p className="font-bold">
                      ₹{item?.product?.price * item?.qty}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>


          <div className="bg-white rounded-lg shadow p-5 h-fit">
            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>Total Items</span>
              <span>{totalItem}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>

           {
            !cartItem?.length==0?(
              <button 
           className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold" >
             <Link to={'/checkOut'} >
              Proceed to Checkout
            </Link>
           </button>
            ):(
            <button 
             className="w-full mt-5 bg-red-400 hover:bg-red-600 text-white py-3 rounded-lg font-semibold hover:cursor-pointer" >
              <Link to={'/'} >
              Add Product First
              </Link>
           </button>
            )
           }
          </div>
        </div>
      </div>
    </div>
  );
}