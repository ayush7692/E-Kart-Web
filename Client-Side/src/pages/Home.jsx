import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getSingleProduct } from "../features/slice/productSlice";
import { Link } from "react-router-dom";
import { addItem, getCart } from "../features/slice/cartSlice";



const Home = () => {
  const dispatch = useDispatch()
  const {products} = useSelector(store=>store.product)
  const {user} = useSelector(store=> store.auth)
  const [options,setOptions] = useState("")
  const [sortData,setSortData] = useState("")
  
    const image =  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"

  useEffect(()=>{
    dispatch(getProducts())
    if(user){
      dispatch(getCart())
    }
  },[])

  const displayData = useMemo(()=>{
      let result = products? [...products] : []

      if(options){
          result = result.filter((item)=> item?.category.toLowerCase()===options.toLowerCase())
      }
      if(sortData === true){
          result = result.sort((a,b)=>a.price-b.price)
      }else if(sortData=== false) {
          result = result.sort((a,b)=>b.price-a.price)
      }

      return result
  },[products,options,sortData])


  const handleClick = ()=>{
      setSortData("")
      setOptions("")
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-white text-blue-800  py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {user?.role==="vendor"?
           <h1 className="text-4xl font-sm mb-1">Welcome to Vendor Dashboard</h1> :
            <h1 className="text-4xl font-sm mb-1">Welcome to Ekart</h1>
          }
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-2">
        <div className="  text-white  flex items-center gap-5 my-1">
          <button
            onClick={handleClick}
            className=" bg-blue-50 p-0.5 rounded-md font-medium text-blue-800 transition hover:cursor-pointer"
          >
            Clear -
          </button>
          <button
            onClick={() => setSortData((prev) => !prev)}
            className=" bg-blue-600 p-0.5 rounded-md font-medium hover:bg-blue-900 transition hover:cursor-pointer"
          >
            Price - {sortData ? "high-low" :"low-high" }
          </button>
          <select
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            className=" bg-blue-600 p-0.5 rounded-md font-medium hover:bg-blue-900 transition hover:cursor-pointer"
          >
            <option value="" disabled className="hidden" >Category</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronic">Electronic</option>
            <option value="Fashion">Fashion</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayData?.map((product) => (
            <div
              key={product?._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition max-h-100"
            >
              <img
                src={product?.image ? product?.image : image}
                alt={product?.name}
                className="w-full h-35 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  {product?.name}
                </h3>

                <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                  {product?.category}
                </span>

                <p className="text-gray-600 mt-3 text-sm">
                  {product?.description}
                </p>

                <p className="text-gray-600 mt-3 text-sm">₹ {product?.price}</p>

                <div className="flex items-center justify-between gap-1">
                  <Link
                    to={`/product/${product._id}`}
                    className="w-full text-center mt-4 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => dispatch(addItem(product?._id))}
                    className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer"
                  >
                    Add To Cart
                  </button>
                </div> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;



  //  onChange={(e)=>{
          //       setOptions(e.target.value)
          //       const filtered = products?.filter((item)=>(item?.category?.toLowerCase().includes(options?.toLowerCase())))
          //       setfilteredData(filtered)
          // }}