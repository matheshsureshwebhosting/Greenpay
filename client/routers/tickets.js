var express = require('express');
var router = express.Router()
var ticketscontroller = require("../controller/ticketscontroller");

router.get("/Traintickets", ticketscontroller.traintickets)
router.post("/Traintickets", ticketscontroller.posttraintickets)

router.get("/Flightticket", ticketscontroller.Flightticket)
router.post("/Flightticket", ticketscontroller.postFlightticket)

router.get("/Thirupathiticket", ticketscontroller.Thirupathiticket)
router.post("/Thirupathiticket", ticketscontroller.postThirupathiticket)
module.exports = router