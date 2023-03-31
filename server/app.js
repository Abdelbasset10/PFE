const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const adminRouter = require('./routes/admin')
const announceRouter = require('./routes/announce')
const authRouter = require('./routes/auth')
const studentRouter = require('./routes/student')
const subjectRouter = require('./routes/subject')
const teacherRouter = require('./routes/teacher')





const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser());


app.use('/admin',adminRouter)
app.use('/announce',announceRouter)
app.use('/auth',authRouter)
app.use('/student',studentRouter)
app.use('/subject',subjectRouter)
app.use('/teacher',teacherRouter)

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/pfe')
    .then(()=>console.log('Connecting with DB...'))
    .catch((err)=>console.log(err))

app.listen(5000,()=>{
    console.log('server is starting on port 5000...')
})
