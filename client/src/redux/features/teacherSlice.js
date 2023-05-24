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

export const allEncadreurs = createAsyncThunk("allEncadreurs/teacher",async (_,{rejectWithValue}) => {
    try {
        const {data} = await api.getEncadreurs()
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
        console.log(userInfo)
        const {data} = await api.updateTeacher(userId,userInfo)
        console.log(data)
        toast.info("you have been updated your self")
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const beVision = createAsyncThunk("beVision/teacher",async ({id,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.beVision(id)
        toast.info("You have been add your self to Encadreurs !!")
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const beNoVision = createAsyncThunk("beNoVision/teacher",async ({id,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.beNoVision(id)
        toast.info("You have been remove your self from Encadreurs List !!")
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
        encadreurs:[],
        encadreursCopy:[],
        teacher:null,
        hisSubjects:[],
        isLoading:false,
        error:""
    },
    reducers:{
        filterEncadreurs : (state,action) => {
            var filtredEncadreurs = [];
            var filtredEncadreurs2 = [];
            console.log(action.payload)
            if(action.payload.subjectType.length > 0 && !action.payload.subjectLvl){
                action.payload.subjectType.map((s)=>{
                    const result = state.encadreursCopy.filter((f)=>f.pfeType === s)
                    if(result.length > 0){
                        result.map((r)=>{
                            filtredEncadreurs = [...filtredEncadreurs,r]
                        })
                    }
                })
                state.encadreurs = filtredEncadreurs
            }else if(action.payload.subjectType.length === 0 && action.payload.subjectLvl){
                const result = state.encadreursCopy.filter((f)=>f.lvl === action.payload.subjectLvl)
                if(result.length > 0){
                    result.map((r)=>{
                        filtredEncadreurs = [...filtredEncadreurs,r]
                    })
                }
                state.encadreurs = filtredEncadreurs
            }else if(action.payload.subjectType.length >0 && action.payload.subjectLvl){
                action.payload.subjectType.map((s)=>{
                    const result = state.encadreursCopy.filter((f)=>f.pfeType === s)
                    if(result.length > 0){
                        result.map((r)=>{
                            filtredEncadreurs = [...filtredEncadreurs,r]
                        })
                    }
                })
                const result2 = filtredEncadreurs.filter((f)=>f.lvl === action.payload.subjectLvl)
                if(result2.length > 0){
                    result2.map((r)=>{
                        filtredEncadreurs2 = [...filtredEncadreurs2,r]
                    })
                }
                state.encadreurs = filtredEncadreurs2
            }else{
                state.encadreurs = state.encadreursCopy
            }
        }

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
        [allEncadreurs.pending] : (state,action) => {
            state.isLoading = true
        },
        [allEncadreurs.fulfilled] : (state,action) => {
            state.isLoading = false
            state.encadreurs = action.payload
            state.encadreursCopy = action.payload
        },
        [allEncadreurs.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload?.message
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
        [beVision.pending] : (state,action) => {
            state.isLoading = true
        },
        [beVision.fulfilled] : (state,action) => {
            state.isLoading = false
            state.teachers.map((s)=>s._id === action.payload.user._id ? action.payload : s)
            state.encadrerus = [...state.encadreurs,action.payload]
            state.encadrerusCopy = [...state.encadreurs,action.payload]
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [beVision.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [beVision.pending] : (state,action) => {
            state.isLoading = true
        },
        [beNoVision.fulfilled] : (state,action) => {
            state.isLoading = false
            state.teachers.map((s)=>s._id === action.payload.user._id ? action.payload : s)
            state.encadrerus = state.encadreurs.filter((f)=>f._id !== action.payload.user?._id)
            state.encadrerusCopy = state.encadreurs.filter((f)=>f._id !== action.payload.user?._id)
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [beVision.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },

    }
})

export const {filterEncadreurs} = teacherslice.actions

export default teacherslice.reducer