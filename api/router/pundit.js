const express = require('express')
const router = express.Router()
const controller = require('../controllers/pundit')

router.post('/addpundit/:set_id', controller.addPundit)
router.post('/editpundit/:set_id/:id', controller.editPundit)
router.post('/uploadfile/:set_id', controller.uploadFile)
router.get('/getallpundit/:set_id', controller.getAllPundit)
router.get('/deletepundit/:set_id/:id', controller.deletePundit)
router.get('/clearpunditbyset/:set_id', controller.clearPunditBySet)

module.exports = router