const express = require("express");
const router = express.Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

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

    const token = jwt.sign({
      id:user.id,
      isSeller: user.isSeller,
    }, process.env.JWT_SECRET,
    {expiresIn:"3d"}
    )

    const {password, ...others} = user.doc

    res.status(200).json(...others, token);
  } catch (err) {
    res.status(500).json(err);
  }
};
const edit = async (req, res) => {
  const verifyToken =(req, res, next)=>{
      const authHeader = req.body.token
      if(authHeader) {
          jwt.verify(token, process.env.JWT_SECRET, (err ,user)=>{if(err) res.status(403).json("Invalid token");
          req.user = user
        })
      } else {
        return res.status(401).json("No Auth ma boi")
      }
  }
  try {

    res.status(200).json(...others, token);
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports = {
  create,
  login,
  edit,
  // deleteIt,
  // getIt,
};
