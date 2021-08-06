var express = require('express');
var app = express();
const db=require("../database/mysql")


exports.Flightticket = (req, res) => {
    return res.send("okay")
}
exports.postFlightticket = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const postFlightticket = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var postFlighttickets = await postFlightticket
    return res.send(postFlighttickets)
}

exports.Thirupathiticket = (req, res) => {
    return res.send("okay")
}
exports.postThirupathiticket = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const Thirupathiticket = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var Thirupathitickets = await Thirupathiticket
    return res.send(Thirupathitickets)
}

exports.traintickets = (req, res) => {
    return res.send("okay")

}
exports.posttraintickets = async (req, res) => {
    const myquery = 'INSERT INTO other_certificates SET ?'
    const traintickets = new Promise(async (resolve, reject) => {
        await db.query(myquery, req.body, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var trainticketss = await traintickets
    return res.send(trainticketss)
}