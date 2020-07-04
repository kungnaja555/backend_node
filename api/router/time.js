const express = require('express')
const router = express.Router()
const controller = require('../controllers/time')

router.post('/settimegroup', controller.setTimeGroup)
router.post('/setonetimegroup/:id', controller.setOneTimeGroup)
router.get('/getalltimes', controller.getAllTimes)
router.get('/deletetime/:id', controller.deleteTime)
router.get('/searchtime/:start/:end', controller.searchTime)
router.get('/movetimeout/:re_id/:set_id/:time_id', controller.moveTimeOut)
router.get('/gettimeforreport/:re_id/:set_id', controller.getTimeForReport)
router.get('/gettimeforavg', controller.getTimeForAvg)
router.get('/cleartimeall', controller.clearTimeAll)

module.exports = router