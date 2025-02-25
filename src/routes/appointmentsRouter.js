const express  = require ("express")

const {getAppointments} = require("../controllers/appointmentsController")

const router = express.Router()


router.get("/", getAppointments)

module.exports = router