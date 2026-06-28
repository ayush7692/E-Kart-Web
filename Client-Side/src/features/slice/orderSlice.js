import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api';


const initialState = {
    orders: null,
    Loading: false,
    orderConfirmed:false,
    OrdererrorMessage:""
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.Loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.Loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(createOrders.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(createOrders.fulfilled, (state, action) => {
        state.Loading = false;
        state.orderConfirmed=true
      })
      .addCase(createOrders.rejected, (state, action) => {
        state.Loading = false;
        state.OrdererrorMessage = action.payload;
        state.orderConfirmed=false
      });      
  }
});

export const {} = orderSlice.actions

export default orderSlice.reducer

export const getOrders = createAsyncThunk('GET/ORDERS',async(_,thunkAPI)=>{
    try {
        let token = thunkAPI.getState()?.auth?.user?.accessToken
    
        const response = await api.get('/order',{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        return response?.data
        
        
    } catch (error) {
        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const createOrders = createAsyncThunk('CREATE/ORDERS',async(_,thunkAPI)=>{
    try {
        let token = thunkAPI.getState()?.auth?.user?.accessToken
    
        const response = await api.post('/order',{},{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        return response.data
        
        
    } catch (error) {
        let message = error.response.data.message
      
        return thunkAPI.rejectWithValue(message)
    }
})



