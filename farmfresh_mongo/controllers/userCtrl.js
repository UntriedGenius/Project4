const express = require("express");
const router = express.Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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

    const accessToken = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Token Verification Tests
const verifyToken = (req, res, next) => {
  const authHeader = req.body.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Invalid token");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("No Auth ma boi");
  }
};

const verifyAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isSeller) {
      next();
    } else {
      res.status(403).json("None of those!");
    }
  });
};

const edit = async (req, res) => {
  // const verifyToken = (req, res, next) => {
  //   const authHeader = req.body.token;
  //   if (authHeader) {
  //     const token = authHeader.split(" ")[1];
  //     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //       if (err) res.status(403).json("Invalid token");
  //       req.user = user;
  //       next();
  //     });
  //   } else {
  //     res.status(401).json("No Auth ma boi");
  //   }
  // };
  // const verifyAndAuth = (req, res, next) => {
  //   verifyToken(req, res, () => {
  //     if (req.user.id === req.params.id || req.user.isSeller) {
  //       next();
  //     } else {
  //       res.status(403).json("None of those!");
  //     }
  //   });
  // };
  verifyToken;
  verifyAndAuth;

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const editedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(editedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteIt = async (req, res) => {
  verifyAndAuth;
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const get = async (req, res) => {
  verifyAndAuth;
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getEm = async (req, res) => {
  verifyAndAuth;
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const stats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  create,
  login,
  edit,
  deleteIt,
  get,
  getEm,
  stats,
};
