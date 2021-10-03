const router = require('express').Router()

const usersController = require('../controllers/UsersController')
const addressesController = require('../controllers/AddressController')
const TechController = require(`../controllers/TechController`)
const ReportController = require('../controllers/ReportController')

router.get('/users', usersController.listUsers)
router.post('/users', usersController.addUser)

router.get('/users/:user_id/address', addressesController.listAddress)
router.post('/users/:user_id/address', addressesController.addAddress)

router.get('/users/:user_id/techs', TechController.listTechs)
router.post('/users/:user_id/techs', TechController.addTech)
router.delete('/users/:user_id/techs', TechController.removeTech)

router.get('/reports', ReportController.listReports)

module.exports = router