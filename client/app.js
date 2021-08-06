var express = require("express")
var app = express()
var bodyparser = require('body-parser')
var path = require("path")
var Razorpay = require('razorpay')
var port = 3001
//view engine
app.set("view engine", "ejs")

//static folders
app.use("/public", express.static(path.join(__dirname, "/public")))
app.use("/views", express.static(path.join(__dirname, "/views")))
app.use("/database", express.static(path.join(__dirname, "/database")))

//bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))


// route init
var testpage = require("./routers/test")
var certificatepage = require("./routers/certificate")
var ticketspage = require("./routers/tickets")
var insurancepage = require("./routers/insurance")
var passportpage = require("./routers/passport")
var paymentpage = require("./routers/payment")
var loginpage = require("./routers/login")
var registerpage = require("./routers/register")
var dashboardpage = require("./routers/dashboard")
var aadharpage = require("./routers/aadhar")


app.use("/test", testpage)
app.use("/dashboard", dashboardpage)
app.use("/certificate", certificatepage)
app.use("/tickets", ticketspage)
app.use("/insurance", insurancepage)
app.use("/passport", passportpage)
app.use("/payment", paymentpage)
app.use("/register", registerpage)
app.use("/login", loginpage)
app.use("/aadhar", aadharpage)

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/download/:id", (req, res) => {
    res.render("Download", { url: req.params.id });
});

app.get("/changepassword", (req, res) => {
    res.render("changepassword");
});

app.get("/history", (req, res) => {
    res.render("history")
});
app.get("/adminhistory", (req, res) => {
    res.sendFile(__dirname + "/views/adminhistory.html");
});
app.get("/clientreg", (req, res) => {
    res.sendFile(__dirname + "/views/clientreg.html");
});

app.get("/add-client", (req, res) => {
    res.sendFile(__dirname + "/views/add-client.html");
});
app.get("/support", (req, res) => {
    res.render("support")
});
app.get("/passportnew", (req, res) => {
    res.render("passportnew")
});
app.get("/passportrenewal", (req, res) => {
    res.render("passportrenewal")
});
app.get("/policeclearance", (req, res) => {
    res.render("policeclearance")
})
app.get("/pan", (req, res) => {
    res.render("pan")
})
app.get("/childrenewal", (req, res) => {
    res.render("childrenewal")
})

app.get("/distributor", (req, res) => {
    res.render("distributor")
});

app.get("/allcertificateshistory",(req,res)=>{
    res.render("allhistory")
 })
 app.get("/othercertificateshistory",(req,res)=>{
    res.render("otherhistory")
 })
 app.get("/pancertificateshistory",(req,res)=>{
    res.render("panhistory")
 })
 app.get("/tickets",(req,res)=>{
    res.render("supportreq")
 })
 app.get("/wallecthistory",(req,res)=>{
    res.render("wallecthistory")
 })
 
 app.get("/tickets/:id",(req,res)=>{
    res.render("supportview",{url:req.params.id})
 })

  

app.listen(port, (req, res) => {
    console.log(`app running on port http://localhost:${port}`)
})