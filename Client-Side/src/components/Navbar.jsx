import { Link } from "react-router-dom";
import { logout } from "../features/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "../features/store";



const Navbar = () => {
  const {user} = useSelector(store=> store.auth)
  const {cartItem} = useSelector(store=> store.cart)
  const dispatch = useDispatch()
  const  showLogin  = false

  
  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
    
        <div className="flex items-center gap-2">
          <Link to={`/`}>
            <h1 className="text-2xl font-bold">Ekart</h1>
          </Link>
        </div>

   
        <div className="flex items-center gap-4">
          {user?.role==="user" ? (
            <>
             
              <Link to={`/cart`} className="px-4 py-2 rounded hover:bg-blue-700 transition">
                Cart : {cartItem.length}
              </Link>

              <Link to={'/order'} className="px-4 py-2 rounded hover:bg-blue-700 transition">
                Orders
              </Link>

               <button onClick={()=>{dispatch(logout())}} className="flex bg-white text-blue-800 rounded-lg font-medium overflow-hidden px-4 py-2 rounded hover:bg-red-300 transition hover:cursor-pointer">
                Loguot
              </button>
            </>
          ) : user?.role==="vendor" ?(
              <>
                <Link to={'/addProduct'} className="px-4 py-2 rounded hover:bg-blue-700 transition">
                AddProduct
              </Link>
               <button onClick={()=>{dispatch(logout())}} className="flex bg-white text-blue-800 rounded-lg font-medium overflow-hidden px-4 py-2 rounded hover:bg-red-300 transition hover:cursor-pointer">
                Loguot
              </button>

              </>

          ):(
            <div className="flex bg-white text-blue-800 rounded-lg overflow-hidden px-4 py-2 font-medium  ">
              <Link to={'/Login'} className="hover:cursor-pointer">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

