var express = require('express');
var router = express.Router()
var Razorpay = require('razorpay')
var paymentcontroller = require("../controller/paymentcontroller");

router.get("/", paymentcontroller.payment)
router.get("/addpayments", paymentcontroller.getaddpayment)
router.post('/paymentadd',paymentcontroller.paymentsadd)
router.post('/paymentsend',paymentcontroller.paymentssend)
router.post('/adminpaymentsend',paymentcontroller.adminpaymentssend)

module.exports = router