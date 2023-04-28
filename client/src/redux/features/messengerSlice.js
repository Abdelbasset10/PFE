import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'


export const userConversations = createAsyncThunk("/userConversation/messenger",async (userId,{rejectWithValue})=> {
    try {
        const {data} = await api.getUserConversations(userId)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const messagesConversation = createAsyncThunk("/messagesConversation/messenger",async (convId,{rejectWithValue})=> {
    try {
        const {data} = await api.getMessagesConversation(convId)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const createMessage = createAsyncThunk("/createMessage/messenger",async ({convId,senderId,text},{rejectWithValue})=> {
    try {
        const {data} = await api.createMessage(convId,senderId,text)
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})



const messengerSlice = createSlice({
    name:"messenger",
    initialState:{
        isLoading : false,
        userConvs:[],
        convMessages:[],
        convId:null,
        freind:"",
        error:""
    },
    reducers:{
        setFreind : (state,action) =>{
            console.log(action.payload)
            state.freind = action.payload.theFreind
            state.convId = action.payload.convId
        }

    },
    extraReducers:{
        [userConversations.pending] :(state,action)=>{
            state.isLoading = true
        },
        [userConversations.fulfilled] :(state,action)=>{
            state.isLoading = false
            state.userConvs = action.payload
        },
        [userConversations.rejected] :(state,action)=>{
            state.isLoadin = false
            state.error = action.payload.message
        },
        [messagesConversation.pending] :(state,action)=>{
            state.isLoading = true
        },
        [messagesConversation.fulfilled] :(state,action)=>{
            state.isLoading = false
            state.convMessages = action.payload
        },
        [messagesConversation.rejected] :(state,action)=>{
            state.isLoading = false
            state.error = action.payload.message
        },
        [createMessage.pending] :(state,action)=>{
            state.isLoading = true
        },
        [createMessage.fulfilled] :(state,action)=>{
            state.isLoading = false
            state.convMessages = [...state.convMessages,action.payload]
        },
        [createMessage.rejected] :(state,action)=>{
            state.isLoading = false
            state.error = action.payload?.message
        },
    }
})

export const {setFreind} = messengerSlice.actions

export default messengerSlice.reducer