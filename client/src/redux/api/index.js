import axios from 'axios'

const API = axios.create({baseURL:'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//Auth
export const signUp = (userInfo) => API.post("/auth/sign-up",userInfo)
export const signIn = (userInfo) => API.post("/auth/sign-in",userInfo)


//Students
export const getAllStudents = () => API.get("/student/all-students")
export const getStudent = (id) => API.get(`/student/${id}`)
export const getNoBinomes = () => API.get("/student/no-binomes")
export const getBinomes = () => API.get("/student/binomes")
export const updateStudent = (id,userInfo) => API.patch(`/student/${id}`,userInfo)
export const searchUser = (userName) => API.get(`/student/search?userName=${userName}`)
export const searchNoBinome = (userName) => API.get(`/student/no-binomes/search?userName=${userName}`)
export const addBinome = (id,userId) => API.patch(`/student/add-binome/${id}`,{studentId:userId}) 
export const beNoBinome = (id,userId) => API.patch(`/student/be-nobinome/${id}`,{studentId:userId}) 
export const addEncadreur = (myId,teacherId) => API.patch(`/student/add-teacher/${teacherId}`,{myId})
export const removeEncadreur = (myId,binomeId,teacherId) => API.patch(`/student/remove-teacher/${teacherId}`,{myId,binomeId})  


//Teachers
export const getAllTeachers = () => API.get("/teacher/all-teachers")
export const getEncadreurs = () => API.get("/teacher/all-encadreurs")
export const getTeacher = (id) => API.get(`/teacher/${id}`)
export const updateTeacher = (id,userIfno) => API.patch(`/teacher/${id}`,userIfno)
export const searchEncadreur = (userName) => API.get(`/teacher/encadreurs/search?userName=${userName}`)
export const beVision = (id) => API.patch(`/teacher/be-vision/${id}`)
export const beNoVision = (id) => API.patch(`/teacher/be-no-vision/${id}`)



//Admins
export const getAlladmins = () => API.get("/admin/all-admins")
export const getAdmin = (id) => API.get(`/admin/${id}`)
export const updateAdmin = (id,userIfno) => API.patch(`/admin/${id}`,userIfno)
export const getAdminsAnnouncements = (id) => API.get(`/announce/admin/${id}`)


//Subjects
export const createSubject = (subjectInfo) => API.post("/subject",subjectInfo)
export const updateSubject = (subjectId,subjectInfo) => API.patch(`/subject/${subjectId}`,subjectInfo)
export const getAllSubjects = () => API.get("/subject")
export const deletSubject = (id) => API.delete(`/subject/${id}`)
export const getTeacherSubjects = (id) => API.get(`/subject/subjects/${id}`)
export const getSubjectByField = (text) => API.get(`/subject/search?field=${text}`)
export const filterSubjects = (filtredSubjects) => API.get(`/subject/filter`,{subjects:filtredSubjects})
export const updateSubjectStatus = (subjectId,studentId) => API.patch(`/subject/status/${subjectId}`,{studentId:studentId})
export const deleteSubjectStatus = (subjectId,studentId) => API.patch(`/subject/status/delete/${subjectId}`,{studentId:studentId})

//Announces
export const createAnnounce = (announceInfo) => API.post("/announce",announceInfo)
export const getAllAnnounces = () => API.get("/announce")
export const updateAnnounce = (announceId,subjectInfo) => API.patch(`/announce/${announceId}`,subjectInfo)
export const deletAnnounce = (id) => API.delete(`/announce/${id}`)

//Messenger

export const createConversation = (user1,user2) => API.post('/conversation',{user1,user2})
export const getUserConversations = (userId) => API.get(`/conversation/${userId}`)
export const getMessagesConversation = (convId) => API.get(`/messenger/${convId}`)
export const createMessage = (convId,senderId,text) => API.post('/messenger',{conversationId:convId,sender:senderId,text})

//Notifications

export const createNotification = (receiver,type) => API.post('/notification',{receiver,type})
export const createSubjectNotification = (subjectId,receiver,type) => API.post('/notification/subject',{subjectId,receiver,type})
export const getUserNotifications = (userId) => API.get(`/notification/${userId}`)
export const acceptedNotification = (notificationId) => API.patch(`/notification/accept/${notificationId}`)
export const declinedNotification = (notificationId) => API.patch(`/notification/decline/${notificationId}`)




