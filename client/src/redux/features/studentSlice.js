import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

export const allStudents = createAsyncThunk("allStudents/student",async (_,{rejectWithValue}) => {
    try {
        const {data} = await api.getAllStudents()
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getStudent = createAsyncThunk("getStudent/student",async (id,{rejectWithValue}) => {
    try {
        const {data} = await api.getStudent(id)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updateStudent = createAsyncThunk("updateStudent/student",async ({userId,userInfo,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.updateStudent(userId,userInfo)
        toast.info("you have been updated your self")
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getNoBinomes = createAsyncThunk("getNoBinomes/student",async (_,{rejectWithValue}) => {
    try {
        const {data} = await api.getNoBinomes()
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addBinome = createAsyncThunk("addBinome/student",async ({UserId,userId,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.addBinome(UserId,userId)
        toast.info("you have been Add that Student to your Binome")
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const studentSlice = createSlice({
    name:"student",
    initialState:{
        noBinomes:[],
        students:[],
        student:null,
        isLoading:false,
        error:""
    },
    reducers:{

    },
    extraReducers:{
        [allStudents.pending] : (state,action) => {
            state.isLoading = true
        },
        [allStudents.fulfilled] : (state,action) => {
            state.isLoading = false
            state.students = action.payload
        },
        [allStudents.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [getStudent.pending] : (state,action) => {
            state.isLoading = true
        },
        [getStudent.fulfilled] : (state,action) => {
            state.isLoading = false
            state.student = action.payload
        },
        [getStudent.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [getNoBinomes.pending] : (state,action) => {
            state.isLoading = true
        },
        [getNoBinomes.fulfilled] : (state,action) => {
            state.isLoading = false
            state.noBinomes = action.payload
        },
        [getNoBinomes.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [updateStudent.pending] : (state,action) => {
            state.isLoading = true
        },
        [updateStudent.fulfilled] : (state,action) => {
            state.isLoading = false
          
            state.students.map((s)=>s._id === action.payload.user._id ? action.payload : s)
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [updateStudent.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [addBinome.pending] : (state,action) => {
            state.isLoading = true
        },
        [addBinome.fulfilled] : (state,action) => {
            state.isLoading = false
            state.students.map((s)=>s._id === action.payload.user._id ? action.payload : s)
        },
        [addBinome.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },

    }
})

export default studentSlice.reducer