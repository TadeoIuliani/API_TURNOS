const express  = require ("express")
const { body, validationResult } = require('express-validator');

const {ValidateUser} = require("../middlewares/usersValidator")
const {postRegister} = require("../controllers/usersController")

const router = express.Router()


router.post("/register", ValidateUser, postRegister)

module.exports = router