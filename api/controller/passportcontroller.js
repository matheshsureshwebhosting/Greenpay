var express = require('express');
var app = express();


const db=require("../database/mysql")

exports.passport = (req, res) => {
    return res.send("okay")
}
exports.passportnew = (req, res) => {
    return res.send("okay")
}
exports.postpassportnew = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const passportnew = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var passportnews = await passportnew
    return res.send(passportnews)
}
exports.passportrenewal = (req, res) => {
    return res.send("okay")
}

exports.postpassportrenewal = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const passportrenewal = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var passportrenewals = await passportrenewal
    return res.send(passportrenewals)
}
exports.tatkaal = (req, res) => {
    return res.send("okay")
}

exports.posttatkaal = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const tatkaal = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var tatkaals = await tatkaal
    return res.send(tatkaals)
}
exports.policeclearance = (req, res) => {
    return res.send("okay")
}
exports.postpoliceclearance = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const policeclearance = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var policeclearances = await policeclearance
    return res.send(policeclearances)
}
exports.childrenewal = (req, res) => {
    return res.send("okay")
}
exports.postchildrenewal = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const childrenewal = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var childrenewals = await childrenewal
    return res.send(childrenewals)
}
exports.childadult = (req, res) => {
    return res.send("okay")
}
exports.postchildadult = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const childadult = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var childadults = await childadult
    return res.send(childadults)
}