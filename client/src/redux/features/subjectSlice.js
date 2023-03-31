import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

export const newSubject = createAsyncThunk("newSubject/subject", async ({subjectInfo,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.createSubject(subjectInfo)
        toast.success("you have been created new Subject !!")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const allSubjects = createAsyncThunk("allSubjects/subject", async (_,{rejectWithValue}) => {
    try {
        const {data} = await api.getAllSubjects()
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const updateSubject = createAsyncThunk("updateSubject/subject", async ({subjectInfo,subjectId,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.updateSubject(subjectId,subjectInfo)
        toast.info("you have been updated the Subject !!")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const deleteSubject = createAsyncThunk("deleteSubject/subject", async ({subjectId,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.deletSubject(subjectId)
        toast.warning("you have been deleted the Subject !!")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})
const subjectSlice = createSlice({
    name:"subject",
    initialState:{
        subjects:[],
        isLoading :false,
        error:"",
    },
    reducers:{

    },
    extraReducers:{
        [newSubject.pending] : (state,action) => {
            state.isLoading = true
        },
        [newSubject.fulfilled] : (state,action) => {
            state.isLoading = false
            state.subjects = [...state.subject,action.payload]
        },
        [newSubject.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload.message
        },
        [allSubjects.pending] : (state,action) => {
            state.isLoading = true
        },
        [allSubjects.fulfilled] : (state,action) => {
            state.isLoading = false
            state.subjects = action.payload
        },
        [allSubjects.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload.message
        },
        [updateSubject.pending] : (state,action) => {
            state.isLoading = true
        },
        [updateSubject.fulfilled] : (state,action) => {
            state.isLoading = false
            state.subjects = state.subjects.map((s)=>s._id === action.payload._id ? action.payload : s)
        },
        [updateSubject.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload.message
        },
        [deleteSubject.pending] : (state,action) => {
            state.isLoading = true
        },
        [deleteSubject.fulfilled] : (state,action) => {
            state.isLoading = false
            state.subjects = state.subjects.filter((s)=>s._id !== action.payload._id)
        },
        [deleteSubject.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload.message
        }
    }
})

export default subjectSlice.reducer