var express = require('express');
var router = express.Router()
var insurancecontroller = require("../controller/insurancecontroller");

router.get("/", insurancecontroller.insurence)

router.get("/four", insurancecontroller.insurencefour)
router.post("/four", insurancecontroller.postinsurencefour)

router.get("/two", insurancecontroller.insurencetwo)
router.post("/two", insurancecontroller.postinsurencetwo)

router.get("/bus", insurancecontroller.insurencebus)
router.post("/bus", insurancecontroller.postinsurencebus)

router.get("/auto", insurancecontroller.insurenceauto)
router.post("/auto", insurancecontroller.postinsurenceauto)

router.get("/foodlicence", insurancecontroller.foodlicence)
router.post("/foodlicence", insurancecontroller.postfoodlicence)

module.exports = router