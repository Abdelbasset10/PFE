const express = require('express')
const {createAnnounce, getAllAnnounces, getAdminAnnouncements, updateAnnounce, deleteAnnounce} = require('../controllers/announce')
const {isAdmin} = require('../middleware')

const router = express.Router()

router.post('/',isAdmin,createAnnounce)
router.get('/',getAllAnnounces)
router.get('/admin/:id',getAdminAnnouncements)
router.patch('/:id',isAdmin,updateAnnounce)
router.delete('/:id',isAdmin,deleteAnnounce)

module.exports = router