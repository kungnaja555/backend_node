const express = require('express')
const router = express.Router()
const controller = require('../controllers/rehearsal')

router.post('/addrehearsal', controller.addRehearsal)
router.post('/editrehearsal/:id', controller.editRehearsal)
router.get('/getallrehearsal', controller.getAllRehearsal)
router.get('/deleterehearsal/:id', controller.deleteRehearsal)
router.get('/getrehearsal/:id', controller.getRehearsal)

module.exports = router