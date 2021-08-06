var express = require('express');
var router = express.Router()
var certificatecontroller = require("../controller/certificatecontroller");

router.get("/",certificatecontroller.allcertificate)

router.get("/Firstgraduatecertificate", certificatecontroller.Firstgraduatecertificate)
router.post("/Firstgraduatecertificate", certificatecontroller.postFirstgraduatecertificate)

router.get("/Communitycertificate", certificatecontroller.Communitycertificte)
router.post("/Communitycertificate", certificatecontroller.postCommunitycertificte)

router.get("/Incomecertificate", certificatecontroller.Incomecertificate)
router.post("/Incomecertificate", certificatecontroller.postIncomecertificate)

router.get("/Unemploymentcerificate", certificatecontroller.Unemploymentcerificate)
router.post("/Unemploymentcerificate", certificatecontroller.postUnemploymentcerificate)

router.get("/Unmarriedcertificate", certificatecontroller.Unmarriedcertificate)
router.post("/Unmarriedcertificate", certificatecontroller.postUnmarriedcertificate)

router.get("/Voteridcertificate", certificatecontroller.voteridcertificate)
router.post("/Voteridcertificate", certificatecontroller.postvoteridcertificate)

router.get("/Widowcertificate", certificatecontroller.Widowcertificate)
router.post("/Widowcertificate", certificatecontroller.postWidowcertificate)

router.get("/Gstcertificate", certificatecontroller.Gst)
router.post("/Gstcertificate", certificatecontroller.postGst)

router.get("/Intercastecertificate", certificatecontroller.InterCaste)
router.post("/Intercastecertificate", certificatecontroller.postInterCaste)

router.get("/Pancertificate", certificatecontroller.Pancertificate)
router.post("/Pancertificate", certificatecontroller.postPancertificate)

router.get("/MSMEcertificate", certificatecontroller.MSMEcertificate)
router.post("/MSMEcertificate", certificatecontroller.postMSMEcertificate)

router.get("/Nativecertificate", certificatecontroller.Nativecertificate)
router.post("/Nativecertificate", certificatecontroller.postNativecertificate)

router.get("/Nomalecertificate", certificatecontroller.Nomalecertificate)
router.post("/Nomalecertificate", certificatecontroller.postNomalecertificate)

router.get("/Obccertificate", certificatecontroller.Obccertificate)
router.post("/Obccertificate", certificatecontroller.postObccertificate)

router.get("/Legalheircertificate", certificatecontroller.Legalheircertificate)
router.post("/Legalheircertificate", certificatecontroller.postLegalheircertificate)

router.get("/Smartcard", certificatecontroller.Smartcard)
router.post("/Smartcard", certificatecontroller.postSmartcard)

router.get("/Itfiling", certificatecontroller.Itfiling)
router.post("/Itfiling", certificatecontroller.postItfiling)

router.get("/Pattatransfer", certificatecontroller.pattatransfer)
router.post("/Pattatransfer", certificatecontroller.postpattatransfer)

router.get("/IRCTC", certificatecontroller.IRCTC)
router.post("/IRCTC", certificatecontroller.postIRCTC)

router.get("/OAB", certificatecontroller.OAB)
router.post("/OAB", certificatecontroller.postOAB)

router.get("/migration-certificate", certificatecontroller.migration)
router.post("/migration-certificate", certificatecontroller.postmigration)

router.get("/farmer-certificate", certificatecontroller.farmer)
router.post("/farmer-certificate", certificatecontroller.postfarmer)

router.get("/widow-pension", certificatecontroller.widow)
router.post("/widow-pension", certificatecontroller.postwidow)

router.get("/Residential", certificatecontroller.Residential)
router.post("/Residential", certificatecontroller.postResidential)

router.get("/gstmonthly", certificatecontroller.gstmonthly)
router.post("/gstmonthly", certificatecontroller.postgstmonthly)

router.get("/incometax", certificatecontroller.incometax)
router.post("/incometax", certificatecontroller.postincometax)

router.get("/FSSAI", certificatecontroller.FSSAI)
router.post("/FSSAI", certificatecontroller.postFSSAI)

router.get("/Fire", certificatecontroller.Fire)
router.post("/Fire", certificatecontroller.postFire)

router.get("/Pvt", certificatecontroller.Pvt)
router.post("/Pvt", certificatecontroller.postPvt)

router.get("/Drug", certificatecontroller.Drug)
router.post("/Drug", certificatecontroller.postDrug)

module.exports = router