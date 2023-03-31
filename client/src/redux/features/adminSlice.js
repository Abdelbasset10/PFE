import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'


export const allAdmins = createAsyncThunk("allAdmins/admin",async (_,{rejectWithValue}) => {
    try {
        const {data} = await api.getAlladmins()
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getAdmin = createAsyncThunk("getAdmin/admin",async (adminId,{rejectWithValue}) => {
    try {
        const {data} = await api.getAdmin(adminId)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const adminAnnounces = createAsyncThunk("adminAnnounces/admin",async (id,{rejectWithValue}) => {
    try {
        const {data} = await api.getAdminsAnnouncements(id)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updateAdmin = createAsyncThunk("updateAdmin/admin",async ({userId,userInfo,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.updateAdmin(userId,userInfo)
        toast.info("you have been updated your self")
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const adminSlice = createSlice({
    name:"admin",
    initialState:{
        admins:[],
        admin:null,
        hisAnnounces:[],
        isLoading : false,
        error:""

    },
    reducers:{

    },
    extraReducers:{
        [allAdmins.pending] : (state,action) => {
            state.isLoading = true
        },
        [allAdmins.fulfilled] : (state,action) => {
            state.isLoading = false
            state.admins = action.payload
        },
        [allAdmins.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [getAdmin.pending] : (state,action) => {
            state.isLoading = true
        },
        [getAdmin.fulfilled] : (state,action) => {
            state.isLoading = false
            state.admin = action.payload
        },
        [getAdmin.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [adminAnnounces.pending] : (state,action) => {
            state.isLoading = true
        },
        [adminAnnounces.fulfilled] : (state,action) => {
            state.isLoading = false
            state.hisAnnounces = action.payload
        },
        [adminAnnounces.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [updateAdmin.pending] : (state,action) => {
            state.isLoading = true
        },
        [updateAdmin.fulfilled] : (state,action) => {
            state.isLoading = false
            state.admins.map((s)=>s._id === action.payload.user._id ? action.payload : s)
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [updateAdmin.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },

    }
})

export default adminSlice.reducer