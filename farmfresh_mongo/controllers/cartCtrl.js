const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");

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

const verifyAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isSeller) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

// controllers

const create = async (req, res) => {
  verifyToken;
  const newCart = new Cart(req.body);

  try {
    const svdCart = await newCart;
    res.status(200).json(svdCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update
const edit = async (req, res) => {
  verifyAndAuth;

  try {
    const editedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(editedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete
const deleteIt = async (req, res) => {
  verifyAndAuth;
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//get
const get = async (req, res) => {
  verifyAndAuth;
  try {
    const cart = await Cart.find({ userId: req.params.userId });

    res.status(200).json(Cart);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getEm = async (req, res) => {
  verifyAndAdmin;
  try {
    const carts = await Cart.find();

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  create,
  edit,
  deleteIt,
  get,
  getEm,
};
