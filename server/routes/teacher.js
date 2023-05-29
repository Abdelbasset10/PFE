const express = require('express')
const {getTeacher, getAllTeachers, getEncadreurs, updateTeacher, deleteTeacher, searchTeacher, searchEncadreur, getTeachersByField, beVision, beNoVision} = require('../controllers/teacher')
const {isTeacher,isStudent} = require('../middleware')

const router = express.Router()

router.get('/all-teachers',isStudent,getAllTeachers)
router.get("/all-encadreurs",isStudent,getEncadreurs)
router.get('/encadreurs/search',isStudent,searchEncadreur)
router.get('/search',isStudent,searchTeacher)
router.get('/search/field',isStudent,getTeachersByField)
router.get('/:id',isStudent,getTeacher)
router.patch('/be-vision/:id',beVision)
router.patch('/be-no-vision/:id',beNoVision)
router.patch('/:id',isTeacher,updateTeacher)
router.delete('/:id',isTeacher,deleteTeacher)


module.exports = router