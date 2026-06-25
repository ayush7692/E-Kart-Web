import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import api from '../../api/api';

const userExist = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user:userExist|| null,
    userLoading: false,
    userSuccess: false,
    userError: false,
    userErrorMessage: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearErrorMessage :(state)=>{
            state.userErrorMessage = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending, (state,actions)=>{
            state.userLoading = true,
            state.userSuccess = false,
            state.userError = false
        }) 
        .addCase(registerUser.fulfilled, (state,actions)=>{
            state.userLoading = false,
            state.userSuccess = true,
            state.user = actions.payload
            state.userError = false
        }) 
        .addCase(registerUser.rejected, (state,actions)=>{
            state.userLoading = false,
            state.userSuccess = false,
            state.userError = true
            state.userErrorMessage = actions.payload 
        }) 
        // Login 
        .addCase(loginUser.pending, (state,actions)=>{
            state.userLoading = true,
            state.userSuccess = false,
            state.userError = false
        }) 
        .addCase(loginUser.fulfilled, (state,actions)=>{
            state.userLoading = false,
            state.userSuccess = true,
            state.user = actions.payload,
            state.userError = false
        }) 
        .addCase(loginUser.rejected, (state,actions)=>{
            state.userLoading = false,
            state.userSuccess = false,
            state.userError = true
            state.userErrorMessage = actions.payload 
        }) 
        .addCase(logout.fulfilled, (state,actions)=>{
            state.userLoading = false,
            state.userSuccess = true,
            state.userError = false,
            state.user = null
        }) 
    }
});

// Export Slice and reducers
export const { clearErrorMessage} = authSlice.actions
export default authSlice.reducer


// Create Asynce Thunk...
export const registerUser = createAsyncThunk("REGISTER/USER",async(formData,thunkAPI)=>{

    try {
        const response =  await api.post("/auth/register",formData)
        localStorage.setItem("user",JSON.stringify(response.data))
        return response?.data
    } catch (error) {
        console.log(error.response.data.message)
        let message = error?.response?.data?.message
        return thunkAPI.rejectWithValue(message)
    }
})

// Login 
export const loginUser  = createAsyncThunk("LOGIN/USER", async(formData,thunkAPI)=>{
    try {
       
        const response = await api.post("/auth/login",formData)
        localStorage.setItem("user",JSON.stringify(response.data))
        return response?.data
    } catch (error) {
        let message = error?.response?.data?.message
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout 

export const logout = createAsyncThunk("LOGOUT/USER",()=>{
    localStorage.removeItem("user")
})