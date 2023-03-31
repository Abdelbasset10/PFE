const express = require('express')
const {getAllAdmins, getAdmin, updateAdmin, deleteAdmin} = require('../controllers/admin')

const {isAdmin,isStudent} = require('../middleware')

const router = express.Router()

router.get('/all-admins',isStudent,getAllAdmins)
router.get('/:id',isStudent,getAdmin)
router.patch('/:id',isAdmin,updateAdmin)
router.delete('/:id',isAdmin,deleteAdmin)

module.exports = router