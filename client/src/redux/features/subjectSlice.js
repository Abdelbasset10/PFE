import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

export const newSubject = createAsyncThunk("newSubject/subject", async ({subjectInfo,toast},{rejectWithValue}) => {
    try {
        console.log(subjectInfo)
        const {data} = await api.createSubject(subjectInfo)
        console.log(data)
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

export const getSubjectByField = createAsyncThunk("getSubjectByField/subject", async (text,{rejectWithValue}) => {
    try {
        const {data} = await api.getSubjectByField(text)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const goFilter = createAsyncThunk("filterSubjects/subject", async (filtredSubjects,{rejectWithValue}) => {
    try {
        console.log(filtredSubjects)
        const {data} = await api.filterSubjects(filtredSubjects)
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
        subjectsCopy:[],
        isLoading :false,
        error:"",
    },
    reducers:{
        filterSubjects :(state,action) =>{
            var newSubjects = []
            if(action.payload.subjectType.length>0 && !action.payload.subjectLvl){
                action.payload.subjectType.map((s)=>{
                    const result = state.subjectsCopy.filter((ss)=>ss.subjectField === s)
                    if(result.length >0){
                        result.map((r)=>{
                            newSubjects = [...newSubjects,r]
                        })
                    }
                })
                state.subjects = newSubjects
            }else if(action.payload.subjectType.length === 0 && action.payload.subjectLvl){
                const result = state.subjectsCopy.filter((s)=>s.pfeLvl === action.payload.subjectLvl)
                if(result.length >0){
                    result.map((r)=>{
                        newSubjects = [...newSubjects,r]
                    })
                }
                state.subjects = newSubjects
            }else if(action.payload.subjectType.length>0 && action.payload.subjectLvl){
                let finalResult = []
                const result = state.subjectsCopy.filter((s)=>s.pfeLvl === action.payload.subjectLvl)
                if(result.length >0){
                    result.map((r)=>{
                        newSubjects = [...newSubjects,r]
                    })
                }
                action.payload.subjectType.map((s)=>{
                    const result2 = newSubjects.filter((ss)=>ss.subjectField === s) 
                    if(result2.length >0){
                        result2.map((r)=>{
                            finalResult = [...finalResult,r]
                        })
                    }
                })
                state.subjects = finalResult
            }else{
                state.subjects = state.subjectsCopy
            }
            
        } 
    },
    extraReducers:{
        [newSubject.pending] : (state,action) => {
            state.isLoading = true
        },
        [newSubject.fulfilled] : (state,action) => {
            state.isLoading = false
            state.subjects = [...state.subjects,action.payload]
            state.subjectsCopy = [...state.subjectsCopy,action.payload]
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
            state.subjectsCopy = action.payload
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
            state.subjectsCopy = state.subjectsCopy.map((s)=>s._id === action.payload._id ? action.payload : s)
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
            state.subjectsCopy = state.subjectsCopy.filter((s)=>s._id !== action.payload._id)
        },
        [deleteSubject.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload.message
        },
        [getSubjectByField.pending] : (state,action) => {
            state.isLoading = true
        },
        [getSubjectByField.fulfilled] : (state,action) => {
            state.isLoading = false
            state.subjects = action.payload
            state.subjectsCopy = action.payload
        },
        [getSubjectByField.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload.message
        },
        [goFilter.pending] : (state,action) => {
            state.isLoading = true
        },
        [goFilter.fulfilled] : (state,action) => {
            state.isLoading = false
            state.subjects = action.payload
        },
        [goFilter.rejected] : (state,action) => {
            state.isLoading = false,
            state.error = action.payload?.message
        }
    }
})

export const {filterSubjects} = subjectSlice.actions

export default subjectSlice.reducer