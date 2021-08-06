var express = require('express');
var router = express.Router()
const { check, validationResult } = require('express-validator');
var logincontroller = require("../controller/logincontroller");

router.get("/", logincontroller.login)
module.exports = router