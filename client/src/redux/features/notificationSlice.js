import * as api from '../api'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const newNotification = createAsyncThunk("newNotification/notification", async({userId,type,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.createNotification(userId,type)
        toast.info(`${type === "binome" ? "Request Binome" :"Request Encadrement"}  has been sent! `)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const userNotifications = createAsyncThunk("userNotifications/notification", async(userId,{rejectWithValue}) => {
    try {
        const {data} = await api.getUserNotifications(userId)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const acceptNotification = createAsyncThunk("acceptNotification/notification", async(notificationId,{rejectWithValue}) => {
    try {
        const {data} = await api.acceptedNotification(notificationId)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const declineNotification = createAsyncThunk("declineNotification/notification", async(notificationId,{rejectWithValue}) => {
    try {
        const {data} = await api.declinedNotification(notificationId)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

const notificationSlice = createSlice({
    name:"notification",
    initialState:{
        notifications:[],
        isLoading:false,
        error:""
    },
    reducers:{

    },
    extraReducers:{
        [newNotification.pending] : (state,action) => {
            state.isLoading = true
        },
        [newNotification.fulfilled] : (state,action) => {
            state.isLoading = false
            state.notifications = [...state.notifications,action.payload]
        },[newNotification.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [userNotifications.pending] : (state,action) => {
            state.isLoading = true
        },
        [userNotifications.fulfilled] : (state,action) => {
            state.isLoading = false
            state.notifications = action.payload
        },
        [userNotifications.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
        [acceptNotification.pending] : (state,action) => {
            state.isLoading = true
        },
        [acceptNotification.fulfilled] : (state,action) => {
            state.isLoading = false
            state.notifications = state.notifications.map((n)=> n._id === action.payload._id ? action.payload : n)
        },
        [acceptNotification.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
        [declineNotification.pending] : (state,action) => {
            state.isLoading = true
        },
        [declineNotification.fulfilled] : (state,action) => {
            state.isLoading = false
            state.notifications = state.notifications.map((n)=> n._id === action.payload._id ? action.payload : n)
        },
        [declineNotification.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload?.message
        }
    }
})

export default notificationSlice.reducer