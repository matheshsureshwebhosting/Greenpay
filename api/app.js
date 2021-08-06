const express = require("express")
const app = express()
const bodyparser = require('body-parser')
const path = require("path")
const dotenv = require("dotenv").config()
const morgan = require("morgan")
const cors = require("cors")
const Razorpay = require('razorpay')
const port = 1201

const db = require("./database/mysql")

//view engine
app.set("view engine", "ejs")

//static folders
app.use("/public", express.static(path.join(__dirname, "/public")))
app.use("/database", express.static(path.join(__dirname, "/database")))

//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(morgan("dev"))

app.use(cors())

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

app.use("/admin", require("./routers/admin"))
app.use("/user", require("./routers/users"))
app.use("/userreg", require("./routers/userreg"))
app.use("/distributors", require("./routers/distributors"))
app.use("/distributorreg", require("./routers/distributorreg"))
app.use("/wallethistory", require("./routers/wallethistory"))
app.use("/paymenthistory", require("./routers/paymenthistory"))
app.use("/othercertificates", require("./routers/othercertificates"))
app.use("/allcertificates", require("./routers/allcertificates"))
app.use("/pancertificates", require("./routers/pancertificates"))
app.use("/support", require("./routers/support"))
app.use("/marquee", require("./routers/marquee"))



app.listen(port, (req, res) => {
    console.log(`app running on port http://localhost:${port}`)
})