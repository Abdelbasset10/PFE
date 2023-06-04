const express = require('express')
const {createSubject, getAllSubjects, getTeacherSubjects, updateSubject, deleteSubject, getSubjectByField, filterSubjects, cacheSubject, getCachedSubject, getNoCachedSubject} = require('../controllers/subject')
const {isTeacher, isStudent, isAdmin} = require('../middleware')

const router = express.Router()

router.get('/filter',isStudent,filterSubjects)
router.post('/',isTeacher,createSubject)
router.get('/',isStudent,getAllSubjects)
router.get('/subjects/:id',isStudent,getTeacherSubjects)
router.get('/search',isStudent,getSubjectByField)
router.get('/cached',isAdmin,getCachedSubject)
router.get('/no-cached',isStudent,getNoCachedSubject)
router.patch('/cache/:id',isTeacher,cacheSubject)
router.patch('/:id',isTeacher,updateSubject)
router.delete('/:id',isTeacher,deleteSubject)
module.exports = router