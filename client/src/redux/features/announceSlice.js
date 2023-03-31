import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

export const newAnnounce = createAsyncThunk("newAnnounce/announce", async ({subjectInfo,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.createAnnounce(subjectInfo)
        toast.success("you have been created new Announce !!")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const allAnnounces = createAsyncThunk("allAnnounces/announce", async (_,{rejectWithValue}) => {
    try {
        const {data} = await api.getAllAnnounces()
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const updateAnnounce = createAsyncThunk("updateAnnounce/announce", async ({subjectInfo,announceId,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.updateAnnounce(announceId,subjectInfo)
        toast.info("you have been updated the Announce !!")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const deleteAnnounce = createAsyncThunk("deleteAnnounce/announce", async ({announceId,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.deletAnnounce(announceId)
        toast.warning("you have been deleted the Announce !!")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

const announceSlice = createSlice({
    name:"announce",
    initialState:{
        announces:[],
        isLoading : false,
        error:""

    },
    reducers:{

    },
    extraReducers:{
        [newAnnounce.pending] : (state,action) => {
            state.isLoading = true
        },
        [newAnnounce.fulfilled] : (state,action) => {
            state.isLoading = false
            state.announces = [...state.announces,action.payload]
        },
        [newAnnounce.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload.message
        },
        [allAnnounces.pending] : (state,action) => {
            state.isLoading = true
        },
        [allAnnounces.fulfilled] : (state,action) => {
            state.isLoading = false
            state.announces = action.payload
        },
        [allAnnounces.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload.message
        },
        [updateAnnounce.pending] : (state,action) => {
            state.isLoading = true
        },
        [updateAnnounce.fulfilled] : (state,action) => {
            state.isLoading = false
            state.announces = state.announces.map((a)=>a._id === action.payload._id ? action.payload : a)
        },
        [updateAnnounce.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload.message
        },
        [deleteAnnounce.pending] : (state,action) => {
            state.isLoading = true
        },
        [deleteAnnounce.fulfilled] : (state,action) => {
            state.isLoading = false
            state.announces = state.announces.filter((a)=>a._id !== action.payload._id)
        },
        [deleteAnnounce.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload.message
        }

    }
})

export default announceSlice.reducer