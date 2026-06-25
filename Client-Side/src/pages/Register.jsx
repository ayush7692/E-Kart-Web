import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrorMessage, registerUser } from "../features/slice/authSlice";
import toast, { Toaster } from 'react-hot-toast';


const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,userErrorMessage}= useSelector(store=> store.auth)



  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const {fullName,email,password,phone,role} = formData
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
    console.log(formData)
  };



  useEffect(()=>{
    if(user){
      navigate('/')
    }
    if(userErrorMessage){
      toast.error(userErrorMessage)
      dispatch(clearErrorMessage())
    }
  },[user,userErrorMessage])

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
     
          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={fullName}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

      
          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>


          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>


          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Role
            </label>
            <select
              name="role"
              value={role}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

        
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <Link to={'/Login'} className="text-blue-800 font-semibold ml-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;