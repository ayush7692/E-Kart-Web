
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrorMessage, loginUser } from "../features/slice/authSlice";
import store from "../features/store";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[showPassword,setShowPassword] = useState(false)

  const {user,userErrorMessage} =  useSelector(store => store.auth)
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {email,password,role} = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
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
    
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your Ekart account
        </p>

      
        <form onSubmit={handleSubmit} className="space-y-4">
   
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

          <div className="relative">
            <label className="block text-blue-800 font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 "
              required
            />
            <button className="absolute right-3 top-2/3 -translate-y-1/2 text-blue-600"
              type="button" 
              onClick={()=>setShowPassword(!showPassword)}  >
                {showPassword ? "Hide" : "Show"}
            </button> 
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-blue-800 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

       
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition  cursor-pointer"
          >
            Login
          </button>
        </form>

      
        <p className="text-center text-gray-600 mt-5">
          Don't have an account?
          <Link  to={'/Register'} className="text-blue-800 font-semibold ml-1 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;