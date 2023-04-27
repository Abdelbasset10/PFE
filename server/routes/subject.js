const express = require('express')
const {createSubject, getAllSubjects, getTeacherSubjects, updateSubject, deleteSubject, getSubjectByField, filterSubjects} = require('../controllers/subject')
const {isTeacher, isStudent} = require('../middleware')

const router = express.Router()

router.get('/filter',isStudent,filterSubjects)
router.post('/',isTeacher,createSubject)
router.get('/',isStudent,getAllSubjects)
router.get('/subjects/:id',isStudent,getTeacherSubjects)
router.get('/search',isStudent,getSubjectByField)
router.patch('/:id',isTeacher,updateSubject)
router.delete('/:id',isTeacher,deleteSubject)
module.exports = router