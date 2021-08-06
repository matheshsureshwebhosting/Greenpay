var express = require('express');
var router = express.Router()
var passportcontroller = require("../controller/passportcontroller");

router.get("/", passportcontroller.passport)
router.get("/passportnew", passportcontroller.passportnew)
router.post("/passportnew", passportcontroller.postpassportnew)

router.get("/passportrenewal", passportcontroller.passportrenewal)
router.post("/passportrenewal", passportcontroller.postpassportrenewal)

router.get("/tatkal", passportcontroller.tatkaal)
router.post("/tatkal", passportcontroller.posttatkaal)

router.get("/policeclearance", passportcontroller.policeclearance)
router.post("/policeclearance", passportcontroller.postpoliceclearance)

router.get("/childrenewal", passportcontroller.childrenewal)
router.post("/childrenewal", passportcontroller.postchildrenewal)

router.get("/childadult", passportcontroller.childadult)
router.post("/childadult", passportcontroller.postchildadult)



module.exports = router