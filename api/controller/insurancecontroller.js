var express = require("express");
var app = express();

const db=require("../database/mysql")

exports.insurence = (req, res) => {
  return res.send("okay")
};
exports.insurencebus = (req, res) => {
  return res.send("okay")
};
exports.postinsurencebus = async (req, res) => {
  const myquery = "INSERT INTO other_certificates SET ?";
  const insurencebus = new Promise(async (resolve, reject) => {
    await db.query(myquery, req.body, (err, res) => {
      if (err) return resolve(err);
      return resolve(true);
    });
  });
  var insurencebuss = await insurencebus;
  return res.send(insurencebuss);
};
exports.insurenceauto = (req, res) => {
  return res.send("okay")
};
exports.postinsurenceauto = async (req, res) => {
  const myquery = "INSERT INTO other_certificates SET ?";
  const insurenceauto = new Promise(async (resolve, reject) => {
    await db.query(myquery, req.body, (err, res) => {
      if (err) return resolve(err);
      return resolve(true);
    });
  });
  var insurenceautos = await insurenceauto;
  return res.send(insurenceautos);
};
exports.insurencefour = (req, res) => {
  return res.send("okay")
};
exports.postinsurencefour = async(req, res) => {
  const myquery = "INSERT INTO other_certificates SET ?";
  const insurencefour = new Promise(async (resolve, reject) => {
    await db.query(myquery, req.body, (err, res) => {
      if (err) return resolve(err);
      return resolve(true);
    });
  });
  var insurencefours = await insurencefour;
  return res.send(insurencefours);
};

exports.insurencetwo = (req, res) => {
  return res.send("okay")
};
exports.postinsurencetwo = async(req, res) => {
  const myquery = "INSERT INTO other_certificates SET ?";
  const insurencetwo = new Promise(async (resolve, reject) => {
    await db.query(myquery, req.body, (err, res) => {
      if (err) return resolve(err);
      return resolve(true);
    });
  });
  var insurencetwos = await insurencetwo;
  return res.send(insurencetwos);
};
exports.foodlicence = (req, res) => {
  return res.send("okay")
};
exports.postfoodlicence = async (req, res) => {
  const myquery = "INSERT INTO other_certificates SET ?";
  const foodlicence = new Promise(async (resolve, reject) => {
    await db.query(myquery, req.body, (err, res) => {
      if (err) return resolve(err);
      return resolve(true);
    });
  });
  var foodlicences = await foodlicence;
  return res.send(foodlicences);
};
