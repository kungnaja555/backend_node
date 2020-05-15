const express = require('express')
const router = express.Router()
const controller = require('../controllers/redis')

router.post('/setstate', controller.setState)
router.get('/getstate', controller.getState)
router.get('/getcount', controller.getCount)
router.get('/getavg', controller.getAvg)

module.exports = router