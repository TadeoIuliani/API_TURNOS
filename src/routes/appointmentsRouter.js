const express  = require ("express")
const { body, validationResult } = require('express-validator');

const {validateGetAppointments, validateGetAppointmentId, validatePostAppointment, validateDeleteAppointment, validatePutAppointment} = require('../middlewares/appointmentValidator');
const {getAppointments, postAppointments, deleteAppointments, getAppointmentId, putAppointmentsId} = require("../controllers/appointmentsController")

const router = express.Router()


router.get("/", validateGetAppointments, getAppointments)
router.get("/:id", validateGetAppointmentId, getAppointmentId)
router.post("/", validatePostAppointment, postAppointments)
router.delete("/:id", validateDeleteAppointment, deleteAppointments)
router.put("/:id", validatePutAppointment, putAppointmentsId)

module.exports = router