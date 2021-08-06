var express = require('express');
var router = express.Router()
const { check, validationResult } = require('express-validator');
var dashboardcontroller = require("../controller/dashboardcontroller");

router.get("/", dashboardcontroller.dashboard)
module.exports = router