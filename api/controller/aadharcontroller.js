var express = require('express');
var app = express();

const db=require("../database/mysql")

exports.aadhar = (req, res) => {
    return res.send("okay")
}
exports.aadharname = (req, res) => {
    return res.send("okay")
}

exports.postaadharname = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const aadharname = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var aadharnames = await aadharname
    return res.send(aadharnames)
}

exports.aadharaddress = (req, res) => {
    return res.send("okay")
}
exports.postaadharaddress = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const aadharaddress = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var aadharaddresss = await aadharaddress
    return res.send(aadharaddresss)
}
exports.aadhardob = (req, res) => {
    return res.send("okay")
}
exports.postaadhardob = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const aadhardob = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var aadhardobs = await aadhardob
    return res.send(aadhardobs)
}
exports.aadharphone = (req, res) => {
    return res.send("okay")
}
exports.postaadharphone = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const aadharphone = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var aadharphones = await aadharphone
    return res.send(aadharphones)
}