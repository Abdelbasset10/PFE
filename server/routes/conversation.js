const express = require('express')
const {createConv, getUserConversations} = require('../controllers/conversation')

const router = express.Router()

router.post('/',createConv)
router.get('/:userId',getUserConversations)

module.exports = router