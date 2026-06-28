import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrders, getOrders } from "../features/slice/orderSlice";
import { Link } from "react-router-dom";


export default function MyOrders() {

    const dispatch = useDispatch()
    const {orders} = useSelector(store=> store.order)


    useEffect(()=>{
        dispatch(getOrders())
    },[])

    
  
        


  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
     
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          My Orders
        </h1>

       {!orders?.length==0 ? (
        <div className="space-y-6">
          {orders?.map((order) => (
            <div
              key={order?._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
   
              <div className="bg-blue-800 text-white p-4 flex flex-col md:flex-row justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    Order ID: {order?._id}
                  </p>
                  <p className="text-sm">
                    Ordered on {new Date(order?.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order?.status}
                  </span>
                </div>
              </div>

  
              <div className="p-5">
             {
              order?.products?.map((item)=>(
                     <div key={item?.product?._id}
                    className="flex justify-between border-b py-3"
                  >
                    <div>
                      <h3 className="font-medium">
                        {item?.product?.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Qty: {item?.qty}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item?.purchasedPrice}
                    </p>
                  </div>
              ))
             }
             

                <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3">
                  
                  <h3 className="text-lg font-bold text-blue-800">
                    Total: ₹{order?.totalBillAmount}
                  </h3>

                  <div className="flex gap-3">  
                      <Link to={'/'}  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Buy Again
                      </Link>
                    
                  </div>
                </div>
              
              </div>
            </div>
          ))}
        </div>):(
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Orders Found
          </h2>
          <p className="text-gray-500 mt-2">
            Start shopping to see your orders here.
          </p>
        </div>
        )}
       </div>
    </div>
  );
}