const express = require('express')
const router = express.Router()
const controller = require('../controllers/redis')

router.post('/setstate', controller.setState)
router.post('/seturl', controller.setUrl)
router.get('/getstate', controller.getState)
router.get('/getcount', controller.getCount)
router.get('/geturl', controller.getUrl)

module.exports = router