const express = require('express')
const {isStudent} = require('../middleware')
const {createNotification, getUserNotifications, acceptedNotification, declinedNotification} = require('../controllers/notification')

const router = express.Router()

router.post('/',isStudent,createNotification)
router.get('/:id',isStudent,getUserNotifications)
router.patch('/accept/:id',isStudent,acceptedNotification)
router.patch('/decline/:id',isStudent,declinedNotification)

module.exports = router

