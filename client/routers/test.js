var express = require('express');
var router = express.Router()

var testcontroller = require("../controller/testcontroller");
const { check, validationResult } = require('express-validator');
router.get("/", testcontroller.test)
router.post("/users", [
    check('email').not().isEmpty().withMessage('Name must have more than 5 characters'),
    check('name', 'Class Year should be a number').not().isEmpty(),
    check('mobile', 'Choose a weekday').not().isEmpty(),
    check('password', 'Your email is not valid').not().isEmpty()
],testcontroller.saveData)

module.exports = router

