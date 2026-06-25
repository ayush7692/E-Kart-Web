import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getSingleProduct } from '../features/slice/productSlice'
import store from '../features/store'
import { addItem } from '../features/slice/cartSlice'

const ProductDetail = () => {
   
    const {pid} = useParams()
    const dispatch = useDispatch()

    const {product} = useSelector(store=>store.product)

    const image =  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"

    useEffect(()=>{
        dispatch(getSingleProduct(pid))
    },[])


  return (
     <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          

          <div>
            <img
              src={product?.image? product?.image : image}
              alt={product?.name}
              className="w-full h-[450px] object-cover rounded-lg"
            />
          </div>

      
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-3">
              {product?.category}
            </span>

            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              {product?.name}
            </h1>

            <p className="text-3xl font-bold text-green-600 mb-4">
              ₹{product?.price}
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product?.description}
            </p>

            <p className="mb-6">
              <span className="font-semibold text-blue-800">
                Availability:
              </span>
              <span className="text-green-600 ml-2">
                In Stock ({product?.stock} items)
              </span>
            </p>

   
            <div className="flex gap-4">
              <button onClick={()=>dispatch(addItem(product?._id))}  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                Add to Cart
              </button>

              <button onClick={()=>dispatch(addItem(product?._id))} className="flex-1 bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                <Link to={'/cart'}>
                Buy Now
                </Link>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail