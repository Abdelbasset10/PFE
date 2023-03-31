import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

export const allTeachers = createAsyncThunk("allTeachers/teacher",async (_,{rejectWithValue}) => {
    try {
        const {data} = await api.getAllTeachers()
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getTeacher = createAsyncThunk("getTeacher/teacher",async (id,{rejectWithValue}) => {
    try {
        const {data} = await api.getTeacher(id)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updateTeacher = createAsyncThunk("updateTeacher/teacher",async ({userId,userInfo,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.updateTeacher(userId,userInfo)
        toast.info("you have been updated your self")
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const teacherSubjects = createAsyncThunk("teacherSubjects/teacher",async (id,{rejectWithValue}) => {
    try {
        const {data} = await api.getTeacherSubjects(id)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const teacherslice = createSlice({
    name:"teacher",
    initialState:{
        teachers:[],
        teacher:null,
        hisSubjects:[],
        isLoading:false,
        error:""
    },
    reducers:{

    },
    extraReducers:{
        [allTeachers.pending] : (state,action) => {
            state.isLoading = true
        },
        [allTeachers.fulfilled] : (state,action) => {
            state.isLoading = false
            state.teachers = action.payload
        },
        [allTeachers.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [getTeacher.pending] : (state,action) => {
            state.isLoading = true
        },
        [getTeacher.fulfilled] : (state,action) => {
            state.isLoading = false
            state.teacher = action.payload
        },
        [getTeacher.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [teacherSubjects.pending] : (state,action) => {
            state.isLoading = true
        },
        [teacherSubjects.fulfilled] : (state,action) => {
            state.isLoading = false
            state.hisSubjects = action.payload
        },
        [teacherSubjects.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [updateTeacher.pending] : (state,action) => {
            state.isLoading = true
        },
        [updateTeacher.fulfilled] : (state,action) => {
            state.isLoading = false
            state.teachers.map((s)=>s._id === action.payload.user._id ? action.payload : s)
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [updateTeacher.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },

    }
})

export default teacherslice.reducer