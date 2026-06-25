import { useState } from "react";
import { addProduct } from "../features/slice/productSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: ""
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(addProduct(productData))
     toast.success('Product add successfully')
     setTimeout(()=>{
        navigate('/')
     },2000)
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-2">
          Add Product
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter product details
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>


          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter product description"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

  
          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

        
          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              min="0"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

  
          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              placeholder="Enter available stock"
              min="0"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;























//    const finalData = {
//       ...productData,
//       price: Number(productData.price),
//       stock: Number(productData.stock),
//       isActive: productData.isActive === "true",
//     };