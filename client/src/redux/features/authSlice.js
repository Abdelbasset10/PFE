import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import Login from '../../pages/Login'

import * as api from '../api'

export const register = createAsyncThunk("register/auth",async ({userInfo,toast,navigate},{rejectWithValue}) => {
    try {
        const {data} = await api.signUp(userInfo)
        window.location.reload()
        toast.success("You have been registered successfully !")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const login = createAsyncThunk("login/auth",async ({userInfo,toast,navigate},{rejectWithValue}) => {
    try {
        const {data} = await api.signIn(userInfo)    
        toast.success("You have been logined successfully !")      
        window.location.reload()

        return data
    } catch (error) {
        toast.error(error.response.data?.message)
        return rejectWithValue(error.response.data)
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        authData:null,
        isLoading:false,
        error:""
    },
    reducers:{
        setUser : (state,action) => {
            state.authData = JSON.parse(localStorage.getItem("profile"))
        },
        logOut : (state,action) => {
            state.authData = null
            localStorage.removeItem("profile")
            setTimeout(()=>{
                window.location.reload()
            },[1000])
        }
    },
    extraReducers:{
        [register.pending] : (state,action) => {
            state.isLoading = true
        },
        [register.fulfilled] : (state,action) => {
            state.isLoading = false
            state.authData = action.payload
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [register.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [login.pending] : (state,action) => {
            state.isLoading = true
        },
        [login.fulfilled] : (state,action) => {
            state.isLoading = false
            state.authData = action.payload
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [login.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
    }
})

export const {setUser, logOut} = authSlice.actions

export default authSlice.reducer