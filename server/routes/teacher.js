const express = require('express')
const {getTeacher, getAllTeachers, updateTeacher, deleteTeacher, searchTeacher, getTeachersByField, beVision, beNoVision} = require('../controllers/teacher')
const {isTeacher,isStudent} = require('../middleware')

const router = express.Router()

router.get('/all-teachers',isStudent,getAllTeachers)
router.get('/search',isStudent,searchTeacher)
router.get('/search/field',isStudent,getTeachersByField)
router.get('/:id',isStudent,getTeacher)
router.patch('/be-vision/:id',beVision)
router.patch('/be-no-vision/:id',beNoVision)
router.patch('/:id',isTeacher,updateTeacher)
router.delete('/:id',isTeacher,deleteTeacher)


module.exports = router