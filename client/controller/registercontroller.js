var express = require('express');
var app = express();
var firebase = require("../database/firebase")
var db = firebase.firestore();
const { check, validationResult } = require('express-validator');

exports.register = (req, res) => {
    res.render("register")
}