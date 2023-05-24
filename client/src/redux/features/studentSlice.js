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

export const getTheStudent = createAsyncThunk("getTheStudent/student",async (id,{rejectWithValue}) => {
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

export const searchNoBinome = createAsyncThunk("searchNoBinome/student",async (userName,{rejectWithValue}) => {
    try {
        const {data} = await api.searchNoBinome(userName)
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

export const getBinomes = createAsyncThunk("getBinomes/student",async (_,{rejectWithValue}) => {
    try {
        const {data} = await api.getBinomes()
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

export const beNoBinome = createAsyncThunk("beNoBinome/student",async ({UserId,userId,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.beNoBinome(UserId,userId)
        toast.warning("you have been remove that Student from your Binome")
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addEncadreur = createAsyncThunk("addEncadreur/student",async ({UserId,binomeId,userId,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.addEncadreur(UserId,binomeId,userId)
        toast.info("you have been Add that Teacher to be your Encadreur")
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const removeEncadreur = createAsyncThunk("removeEncadreur/student",async ({UserId,binomeId,userId,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.removeEncadreur(UserId,binomeId,userId)
        toast.warning("you have been Add that Teacher to be your Encadreur")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

const studentSlice = createSlice({
    name:"student",
    initialState:{
        noBinomes:[],
        noBinomesCopy:[],
        binomes:[],
        students:[],
        student:null,
        isLoading:false,
        error:""
    },
    reducers:{
        filterStudent :(state,action) => {
            var filtredBinomes = [];
            var filtredBinomes2 = [];
            var filtredBinomes3 = [];
            if(action.payload.section.length >0 && action.payload.subjectType.length === 0 && !action.payload.studentLvl){
                console.log("section")
                action.payload.section.map((s)=>{
                    const result = state.noBinomesCopy.filter((f)=>f.section === s)
                    if(result.length >0){
                        result.map((r)=>{
                            filtredBinomes = [...filtredBinomes,r]
                        })
                    }
                })
                state.noBinomes = filtredBinomes
            }else if(action.payload.section.length === 0 && action.payload.subjectType.length > 0 && !action.payload.studentLvl){
                console.log("pfetype")
                action.payload.subjectType.map((s)=>{
                    const result = state.noBinomesCopy.filter((f)=>f.pfeType === s)
                    if(result.length >0){
                        result.map((r)=>{
                            filtredBinomes = [...filtredBinomes,r]
                        })
                    }
                })
                state.noBinomes = filtredBinomes
            }else if(action.payload.section.length === 0 && action.payload.subjectType.length === 0 && action.payload.studentLvl){
                console.log("lvl")
                const result = state.noBinomesCopy.filter((f)=>f.lvl === action.payload.studentLvl)
                if(result.length >0){
                    result.map((r)=>{
                        filtredBinomes = [...filtredBinomes,r]
                    })
                }
                state.noBinomes = filtredBinomes
            }else if(action.payload.section.length > 0 && action.payload.subjectType.length > 0 && !action.payload.studentLvl){
                console.log("section + pfetype")
                action.payload.section.map((s)=>{
                    const result = state.noBinomesCopy.filter((f)=>f.section ===s)
                    if(result.length >0){
                        result.map((r)=>{
                            filtredBinomes = [...filtredBinomes,r]
                        })
                    }
                })
                action.payload.subjectType.map((s)=>{
                    const result2 = filtredBinomes.filter((f)=>f.pfeType === s)
                    if(result2.length >0){
                        result2.map((r)=>{
                            filtredBinomes2 = [...filtredBinomes2,r]
                        })
                    }
                })
                state.noBinomes = filtredBinomes2
            }else if(action.payload.section.length > 0 && action.payload.subjectType.length === 0 && action.payload.studentLvl){
                console.log("section + lvl")
                action.payload.section.map((s)=>{
                    const result = state.noBinomesCopy.filter((f)=>f.section ===s)
                    if(result.length >0){
                        result.map((r)=>{
                            filtredBinomes = [...filtredBinomes,r]
                        })
                    }
                })
                const result2 = filtredBinomes.filter((f)=>f.lvl === action.payload.studentLvl)
                if(result2.length >0){
                    result2.map((r)=>{
                        filtredBinomes2 = [...filtredBinomes2,r]
                    })
                }
                state.noBinomes = filtredBinomes2
            }else if(action.payload.section.length === 0 && action.payload.subjectType.length > 0 && action.payload.studentLvl){
                console.log("pfetype + lvl")
                action.payload.subjectType.map((s)=>{
                    const result = state.noBinomesCopy.filter((f)=>f.pfeType === s)
                    if(result.length >0){
                        result.map((r)=>{
                            filtredBinomes = [...filtredBinomes,r]
                        })
                    }
                })
                const result2 = filtredBinomes.filter((f)=>f.lvl === action.payload.studentLvl)
                if(result2.length >0){
                    result2.map((r)=>{
                        filtredBinomes2 = [...filtredBinomes2,r]
                    })
                }
                state.noBinomes = filtredBinomes2
            }else if(action.payload.section.length > 0 && action.payload.subjectType.length > 0 && action.payload.studentLvl){
                action.payload.section.map((s)=>{
                    const result = state.noBinomesCopy.filter((f)=>f.section === s)
                    if(result.length >0){
                        result.map((r)=>{
                            filtredBinomes = [...filtredBinomes,r]
                        })
                    }
                })
                action.payload.subjectType.map((s)=>{
                    const result2 = filtredBinomes.filter((f)=>f.pfeType === s)
                    if(result2){
                        result2.map((r)=>{
                            filtredBinomes2 = [...filtredBinomes2,r]
                        })
                    }
                })
                const result3 = filtredBinomes2.filter((f)=>f.lvl === action.payload.studentLvl)
                if(result3){
                    result3.map((r)=>{
                        filtredBinomes3 = [...filtredBinomes3,r]
                    })
                }
                state.noBinomes = filtredBinomes3
            }else{
                state.noBinomes = state.noBinomesCopy
            }
            
        }

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
        [getTheStudent.pending] : (state,action) => {
            state.isLoading = true
        },
        [getTheStudent.fulfilled] : (state,action) => {
            state.isLoading = false
            state.student = action.payload
        },
        [getTheStudent.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [getNoBinomes.pending] : (state,action) => {
            state.isLoading = true
        },
        [getNoBinomes.fulfilled] : (state,action) => {
            state.isLoading = false
            state.noBinomes = action.payload
            state.noBinomesCopy = action.payload
        },
        [getNoBinomes.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [getBinomes.pending] : (state,action) => {
            state.isLoading = true
        },
        [getBinomes.fulfilled] : (state,action) => {
            state.isLoading = false
            state.binomes = action.payload
        },
        [getBinomes.rejected] : (state,action) => {
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
        [searchNoBinome.pending] : (state,action) => {
            state.isLoading = true
        },
        [searchNoBinome.fulfilled] : (state,action) => {
            state.isLoading = false
            console.log(action.payload)
            state.noBinomes = action.payload
        },
        [searchNoBinome.rejected] : (state,action) => {
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
        [beNoBinome.pending] : (state,action) => {
            state.isLoading = true
        },
        [beNoBinome.fulfilled] : (state,action) => {
            state.isLoading = false
            state.students.map((s)=>s._id === action.payload.user._id ? action.payload : s)
        },
        [beNoBinome.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [addEncadreur.pending] : (state,action) => {
            state.isLoading = true
        },
        [addEncadreur.fulfilled] : (state,action) => {
            state.isLoading = false
            state.students.map((s)=>s._id === action.payload.user._id ? action.payload : s)
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [addEncadreur.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [removeEncadreur.pending] : (state,action) => {
            state.isLoading = true
        },
        [removeEncadreur.fulfilled] : (state,action) => {
            state.isLoading = false
            state.students.map((s)=>s._id === action.payload.user._id ? action.payload : s)
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [removeEncadreur.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },

    }
})

export const {filterStudent} = studentSlice.actions

export default studentSlice.reducer