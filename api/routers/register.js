var express = require('express');
var router = express.Router()
const { check, validationResult } = require('express-validator');
var registercontroller = require("../controller/registercontroller");

router.get("/", registercontroller.register)
module.exports = router