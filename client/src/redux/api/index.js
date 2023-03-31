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
export const updateStudent = (id,userInfo) => API.patch(`/student/${id}`,userInfo)
export const addBinome = (id,userId) => API.patch(`/student/add-binome/${id}`,{studentId:userId}) 


//Teachers
export const getAllTeachers = () => API.get("/teacher/all-teachers")
export const getTeacher = (id) => API.get(`/teacher/${id}`)
export const updateTeacher = (id,userIfno) => API.patch(`/teacher/${id}`,userIfno)


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


//Announces
export const createAnnounce = (announceInfo) => API.post("/announce",announceInfo)
export const getAllAnnounces = () => API.get("/announce")
export const updateAnnounce = (announceId,subjectInfo) => API.patch(`/announce/${announceId}`,subjectInfo)
export const deletAnnounce = (id) => API.delete(`/announce/${id}`)



