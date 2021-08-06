var express = require('express');
var app = express();

const { check, validationResult } = require('express-validator');

exports.register = (req, res) => {
    res.render("register")
}