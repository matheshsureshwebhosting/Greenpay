var express = require('express');
var app = express();

const { check, validationResult } = require('express-validator');
exports.login = (req, res) => {
    res.render("login")
}
