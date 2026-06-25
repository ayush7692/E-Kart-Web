import { useState } from "react";
import { addAddress } from "../features/slice/addressSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddAddress = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


  const [addressData, setAddressData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    isDefault: "true"
  });

  const {name,email,phone,street,city,state,country,pinCode} = addressData

  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };    

  const finalData = {
    ...addressData,
    pinCode:Number(pinCode),
    phone:Number(phone)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAddress(addressData))
    toast.success("Address successfully added")
    setTimeout(()=>{
        navigate('/cart')
    },2000)
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-2">
          Add Address
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter your delivery address details
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

   
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

  
          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Street Address
            </label>
            <textarea
              name="street"
              value={street}
              onChange={handleChange}
              rows="3"
              placeholder="Enter street address"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={state}
                onChange={handleChange}
                placeholder="Enter state"
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={country}
                onChange={handleChange}
                placeholder="Enter country"
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Pin Code
              </label>
              <input
                type="text"
                name="pinCode"
                value={pinCode}
                onChange={handleChange}
                placeholder="Enter pin code"
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

        
          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Set as Default Address
            </label>
            <select
              name="isDefault"
              value={addressData.isDefault}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;