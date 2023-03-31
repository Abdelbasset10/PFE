import {createSlice} from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name:"modal",
    initialState:{
        isNewSubject:false,
        subjectId:null,
        isNewAnnounce:false,
        announceId:null,
        updateProfile:false
    },
    reducers:{
        openSubjectModal : (state,action) => {
            state.isNewSubject = true
        },
        openUpdateSubjectModal : (state,action) => {
            state.isNewSubject = true
            state.subjectId = action.payload
        },
        closeModal : (state,action) => {
            state.isNewSubject = false
            state.isNewAnnounce = false
            state.subjectId = null
            state.announceId = null
        },
        openAnnounceModal : (state,action) => {
            state.isNewAnnounce = true
        },
        openUpdateAnnounceModal : (state,action) => {
            state.isNewAnnounce = true
            state.announceId = action.payload
        },
        openProfileModal : (state,action) => {
            state.updateProfile = true
        },
        closeProfileModal : (state,action) => {
            state.updateProfile = false
        }
    },
    extraReducers:{

    }
})

export const {openSubjectModal, openUpdateAnnounceModal, closeModal, openAnnounceModal, openUpdateSubjectModal, openProfileModal,closeProfileModal} = modalSlice.actions

export default modalSlice.reducer