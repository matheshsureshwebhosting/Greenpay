var express = require('express');
var app = express();

const { check, validationResult } = require('express-validator');
exports.dashboard = (req, res) => {
    res.render("dashboard")
}