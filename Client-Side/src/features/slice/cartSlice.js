import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api';
import axios from 'axios';


const initialState = {
    cartItem : [],
    errorMessage:""
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
        .addCase(getCart.pending,(state, action) => {
                state.cartLoading = true
            })

        .addCase(getCart.fulfilled,(state, action) => {
                state.cartLoading = false
                state.cartItem = action.payload
            })
        .addCase(getCart.rejected,(state, action) => {
                state.cartLoading = false
                state.errorMessage = action.payload
            })
        .addCase(increaseItem.pending,(state, action) => {
                state.cartLoading = true
            })

        .addCase(increaseItem.fulfilled,(state, action) => {
                state.cartLoading = false
                state.cartItem = action.payload
            })
        .addCase(increaseItem.rejected,(state, action) => {
                state.cartLoading = false
                state.errorMessage = action.payload
            })
        .addCase(decreaseItem.pending,(state, action) => {
                state.cartLoading = true
            })

        .addCase(decreaseItem.fulfilled,(state, action) => {
                state.cartLoading = false
                state.cartItem = action.payload
            })
        .addCase(decreaseItem.rejected,(state, action) => {
                state.cartLoading = false
                state.errorMessage = action.payload
            })   
        .addCase(removeItem.pending,(state, action) => {
                state.cartLoading = true
            })

        .addCase(removeItem.fulfilled,(state, action) => {
                state.cartLoading = false
                state.cartItem = state.cartItem.filter(item=>item?.product?._id!==action.payload.id)
            })
        .addCase(removeItem.rejected,(state, action) => {
                state.cartLoading = false
                state.errorMessage = action.payload
            }) 
         .addCase(addItem.pending,(state, action) => {
                state.cartLoading = true
            })

        .addCase(addItem.fulfilled,(state, action) => {
                state.cartLoading = false
                state.cartItem = action.payload
            })
        .addCase(addItem.rejected,(state, action) => {
                state.cartLoading = false
                state.errorMessage = action.payload
            }) 
  }
});

export const {} = cartSlice.actions

export default cartSlice.reducer


export const getCart = createAsyncThunk('GET/CART',async(_,thunkAPI)=>{
    try {
        let token = thunkAPI.getState()?.auth?.user?.accessToken
    
        const response = await api.get('/cart',{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        return response.data
        
        
    } catch (error) {
        let message = error.response.data.message
        console.log(message )
        return thunkAPI.rejectWithValue(message)
    }
})
export const addItem = createAsyncThunk('ADD/ITEM',async(id,thunkAPI)=>{
    try {
        let token = thunkAPI.getState()?.auth?.user?.accessToken
    
        const response = await api.post('/cart/'+id,{},{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        return response.data.products
        
        
    } catch (error) {
        let message = error.response?.data?.message || error.message
        console.log(message )
        return thunkAPI.rejectWithValue(message)
    }
})

export const increaseItem = createAsyncThunk('INCREASE/ITEM',async(id,thunkAPI)=>{
    try {
        // console.log(id)
        let token = thunkAPI.getState()?.auth?.user?.accessToken
        // console.log(token)
        const response = await api.put('/cart/increase/'+id,{},{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        return response.data.products
        
        
    } catch (error) {
        let message = error.response?.data?.message || error.message
        console.log(message )
        return thunkAPI.rejectWithValue(message)
    }
})

export const decreaseItem = createAsyncThunk('DECREASE/ITEM',async(id,thunkAPI)=>{
    try {
        // console.log(id)
        let token = thunkAPI.getState()?.auth?.user?.accessToken
    
        const response = await api.put('/cart/decrease/'+id,{},{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        return response.data.products
        
        
    } catch (error) {
        let message = error.response
        console.log(message )
        return thunkAPI.rejectWithValue(message)
    }
})


export const removeItem = createAsyncThunk('REMOVE/ITEM',async(id,thunkAPI)=>{
    try {
        let token = thunkAPI.getState()?.auth?.user?.accessToken
    
        const response = await api.put('/cart/remove/'+id,{},{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
      
        return response?.data
        
        
    } catch (error) {
        let message = error.response
        console.log(message )
        return thunkAPI.rejectWithValue(message)
    }
})