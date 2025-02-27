const express  = require ("express")
const { body, validationResult } = require('express-validator');

const {validateGetAppointments, validateGetAppointmentId, validatePostAppointment, validateDeleteAppointment, validatePutAppointment} = require('../middlewares/appointmentValidator');
const {getAppointments, postAppointments, deleteAppointments, getAppointmentId, putAppointmentsId} = require("../controllers/appointmentsController")

const {verifyToken} = require("../middlewares/tokenValidator")
const {checkRole} = require("../middlewares/rolValidator")


const router = express.Router()


router.get("/", verifyToken, checkRole(['admin']),validateGetAppointments, getAppointments)
router.get("/:id", verifyToken, checkRole(['admin', 'user']),validateGetAppointmentId, getAppointmentId)
router.post("/", verifyToken, checkRole(['admin', 'user']),validatePostAppointment, postAppointments)
router.delete("/:id", verifyToken, checkRole(['admin', 'user']),validateDeleteAppointment, deleteAppointments)
router.put("/:id", verifyToken, checkRole(['admin', 'user']),validatePutAppointment, putAppointmentsId)

module.exports = router