var express = require('express');
var app = express();
var firebase = require("../database/firebase")
var db = firebase.firestore();
var Razorpay = require('razorpay')

let instance = new Razorpay({
    key_id: 'rzp_live_YXToUEMpuUyuFj', // your `KEY_ID`(rzp_test_UkuRUR5PV5XO8i)
    key_secret: 'Jf6fLlQOydPTxH8eW5CnoFsO' // your `KEY_SECRET`(d8r4Hxs6zPzyNRlM493ZwNES)
})
exports.payment = (req, res) => {
    res.render("payments")

}
exports.getaddpayment = (req, res) => {
    res.render("addpayments")
}
exports.paymentsadd = (req, res) => {    
    instance.orders.create(req.body).then((data) => {       
        res.send({ "sub": data, "status": "success" });
    }).catch((error) => {
        res.send({ "sub": error, "status": "failed" });
    })
}
exports.paymentssend=(req,res)=>{
    db.collection("users").doc(req.body.uemail).collection("wallet").doc(req.body.uemail).get().then(function(doc){
        if(doc.data()!=undefined){
            db.collection("users").doc(req.body.uemail).collection("wallet").doc(req.body.uemail).set({
                name:req.body.name,
                date:req.body.date,
                amount:Number(doc.data().amount)+Number(req.body.amount),
                phone:req.body.phone,
                razorpay_payment_id:req.body.razorpay_payment_id,
                razorpay_order_id:req.body.razorpay_order_id
            })
            .then((doc)=>{
              db.collection("users").doc(req.body.uemail).collection("history").doc().set({
                  date:req.body.date,
                  amount:req.body.amount,
                  status:"success"
              })
                res.send({status:"okay"})
            })
        }else{

            db.collection("users").doc(req.body.uemail).collection("wallet").doc(req.body.uemail).set({
                name:req.body.name,
                date:req.body.date,
                amount:req.body.amount,
                phone:req.body.phone,
                razorpay_payment_id:req.body.razorpay_payment_id,
                razorpay_order_id:req.body.razorpay_order_id
            })
            .then((doc)=>{
              db.collection("users").doc(req.body.uemail).collection("history").doc().set({
                  date:req.body.date,
                  amount:req.body.amount,
                  status:"success"
              })
                res.send({status:"okay"})
            })
        }
    })
 
}