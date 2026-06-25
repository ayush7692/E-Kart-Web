import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api';

const initialState = {
    products:[],
    product:{},
    loading:false,
    errorMessage:""
}

const product = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
        .addCase(getProducts.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.errorMessage = action.payload
        })
        // single product
        .addCase(getSingleProduct.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(getSingleProduct.fulfilled,(state,action)=>{
            state.loading = false
            state.product = action.payload
        })
        .addCase(getSingleProduct.rejected,(state,action)=>{
            state.errorMessage = action.payload
        })
        .addCase(addProduct.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload
        })
        .addCase(addProduct.rejected,(state,action)=>{
            state.errorMessage = action.payload
        })
}});

export const {} = product.actions

export default product.reducer



// Create Asynce Thunk...
export const getProducts = createAsyncThunk('GET/PRODUCTS',async(_,thunkAPI)=>{
    try {
        const response = await api.get('/products')
        return  response?.data?.products
        
    } catch (error) {
        let message =  error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const getSingleProduct = createAsyncThunk('GET/PRODUCT',async(id,thunkAPI)=>{
    try {
      
        const response = await api.get('/products/'+id)
        
        return response.data.products 
        
    } catch (error) {
        let message =  error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const addProduct = createAsyncThunk('ADD/PRODUCT',async(productData,thunkAPI)=>{
    console.log(productData)
    try {
        let token = thunkAPI.getState()?.auth?.user?.accessToken
        const response = await api.post('/vendor/products',productData,{ 
            headers:{
                authorization: `Bearer ${token}`}}
            )

        return response.data.products 
        
    } catch (error) {
        let message =  error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})