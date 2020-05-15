const express = require('express')
const router = express.Router()
const controller = require('../controllers/faculty')

router.post('/addfaculty', controller.addFaculty)
router.post('/editfaculty/:id', controller.editFaculty)
router.get('/getallfaculty', controller.getAllFaculty)
router.get('/deletefaculty/:id', controller.deleteFaculty)
router.get('/getfaculty/:id', controller.getFaculty)

router.post('/updatesomeattrrehearsal/:re_id', controller.updateSomeAttrRehearsal)
router.post('/updateallattrrehearsal/:re_id', controller.updateAllAttrRehearsal)
router.post('/addfacultyinrehearsal/:re_id', controller.addFacultyInRehearsal)
router.post('/editgroup/:re_id/:fac_id', controller.editGroup)
router.get('/getfacultysbyrehearsal/:re_id', controller.getFacultysByRehearsal)
router.get('/removerehearsalinfaculty/:re_id/:fac_id', controller.removeRehearsalInFaculty)
router.get('/deletegroup/:re_id/:fac_id', controller.deleteGroup)

router.get('/reportname/:re_id',controller.reportName)
router.get('/report/:re_id',controller.report)

module.exports = router