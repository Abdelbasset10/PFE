const express = require('express')
const {getAllStudents, getStudent, updateStudent, deleteStudent, getAllNoBinomes, searchStudent, addBinome, BeNoBinome, addTeacher, removeTeacher, getStudentsBySection} = require('../controllers/student')
const {isStudent} = require('../middleware')

const router = express.Router()

router.get('/all-students',isStudent,getAllStudents)
router.get('/no-binomes',isStudent,getAllNoBinomes)
router.get('/search/section',isStudent,getStudentsBySection)
router.get('/search',isStudent,searchStudent)
router.get('/:id',isStudent,getStudent)
router.patch('/add-binome/:id',isStudent,addBinome)
router.patch('/be-nobinome/:id',isStudent,BeNoBinome)
router.patch('/add-teacher/:id',isStudent,addTeacher)
router.patch('/remove-teacher/:id',isStudent,removeTeacher)
router.patch('/:id',isStudent,updateStudent)
router.delete('/:id',isStudent,deleteStudent)

module.exports = router