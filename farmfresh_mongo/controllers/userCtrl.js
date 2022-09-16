const express = require("express");
const router = express.Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const { rawListeners } = require("../models/user");

const create = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("No User detected");

    const hashed = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
    const pass = hashed.toString(CryptoJS.enc.Utf8);
    pass !== req.body.password && res.status(401).json("Incorrect Password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  create,
  login,
  // edit,
  // deleteIt,
  // getIt,
};
