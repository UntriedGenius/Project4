const express = require("express");
const router = express.Router();
const User = require("../models/user");

module.exports = {
  create,
  edit,
  deleteIt,
};
