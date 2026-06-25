import { configureStore } from "@reduxjs/toolkit"
import auth from './slice/authSlice'
import product from './slice/productSlice'
import cart from './slice/cartSlice'
import order from './slice/orderSlice'
import address from './slice/addressSlice'

const store = configureStore({
    reducer:{auth,product,cart,order,address}
})
console.log('STORE STATE:', store.getState())
export default store