const express = require('express')
const {createMessage, getMessagesConversation} = require('../controllers/messages')

const router = express.Router()

router.post('/',createMessage)
router.get('/:conversationId',getMessagesConversation)

module.exports = router