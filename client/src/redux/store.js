import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import modalSlice from './features/modalSlice'
import studentSlice from './features/studentSlice'
import teacherSlice from './features/teacherSlice'
import subjectSlice from './features/subjectSlice'
import announceSlice from './features/announceSlice'
import adminSlice from './features/adminSlice'
import messengerSlice from './features/messengerSlice'
import notificationSlice from './features/notificationSlice'

const store = configureStore({
    reducer:{
        auth:authSlice,
        modal:modalSlice,
        student:studentSlice,
        teacher:teacherSlice,
        subject:subjectSlice,
        announce:announceSlice,
        admin:adminSlice,
        messenger:messengerSlice,
        notification:notificationSlice
    }
})

export default store