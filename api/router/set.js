const express = require('express')
const router = express.Router()
const controller = require('../controllers/set')

router.post('/addSet/:fac_id', controller.addSet)
router.post('/editSet/:fac_id/:set_id', controller.editSet)
router.get('/getallset/:fac_id', controller.getAllSet)
router.get('/deleteset/:fac_id/:set_id', controller.deleteSet)
router.get('/getset/:set_id', controller.getSet)

router.post('/addallcontentinset/:re_id/:fac_id', controller.addAllContentInSet)
router.post('/addsomecontentinset/:re_id/:fac_id', controller.addSomeContentInSet)
router.post('/addnewcontentinset/:re_id/:fac_id', controller.addNewContentInSet)
router.post('/editnewcontentinset/:re_id/:fac_id/:set_id', controller.editNewContentInSet)
router.get('/getsetsbyfaculty/:re_id/:fac_id', controller.getSetsByFaculty)
router.get('/removecontentinset/:re_id/:fac_id/:set_id', controller.removeContentInSet)
router.get('/deletenewcontentinset/:re_id/:fac_id/:set_id', controller.deleteNewContentInSet)

module.exports = router