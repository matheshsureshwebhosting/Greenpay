var express = require('express');
var app = express();
var firebase = require("../database/firebase")
var db = firebase.firestore();
const { check, validationResult } = require('express-validator');
exports.login = (req, res) => {
    res.render("login")
}
