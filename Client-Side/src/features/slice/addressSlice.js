import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api';

const initialState = {
    address:null,
    Loading:false,
    errorMessage:""
}

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
      builder
        .addCase(getAddress.pending, (state, action) => {
          state.Loading = true;
        })
        .addCase(getAddress.fulfilled, (state, action) => {
          state.Loading = false;
          state.address = action.payload;
        })
        .addCase(getAddress.rejected, (state, action) => {
          state.Loading = false;
          state.errorMessage = action.payload;
        })
        .addCase(addAddress.pending, (state, action) => {
          state.Loading = true;
        })
        .addCase(addAddress.fulfilled, (state, action) => {
          state.Loading = false;
          state.address = action.payload;
        })
        .addCase(addAddress.rejected, (state, action) => {
          state.Loading = false;
          state.errorMessage = action.payload;
        })
    }
});

export const {} = addressSlice.actions

export default addressSlice.reducer



export const getAddress = createAsyncThunk('GET/ADDRESS',async(_,thunkAPI)=>{
    try {
        let token = thunkAPI.getState()?.auth?.user?.accessToken
    
        const response = await api.get('/user/address',{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response?.data
        
        
    } catch (error) {
        let message = error.response.data.message
    
        return thunkAPI.rejectWithValue(message)
    }
})

export const addAddress = createAsyncThunk('ADD/ADDRESS',async(addressData,thunkAPI)=>{
    try {
        let token = thunkAPI.getState()?.auth?.user?.accessToken
    
        const response = await api.post('/user/address',addressData,{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response?.data
        
        
    } catch (error) {
        let message = error.response.data.message
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})