var express = require('express');
var router = express.Router()
var aadharcontroller = require("../controller/aadharcontroller");

router.get("/", aadharcontroller.aadhar)

router.get("/name", aadharcontroller.aadharname)
router.post("/name", aadharcontroller.postaadharname)

router.get("/address", aadharcontroller.aadharaddress)
router.post("/address", aadharcontroller.postaadharaddress)

router.get("/dob", aadharcontroller.aadhardob)
router.post("/dob", aadharcontroller.postaadhardob)

router.get("/phone", aadharcontroller.aadharphone)
router.post("/phone", aadharcontroller.postaadharphone)


module.exports = router