const express = require("express");
const router = express.Router();
const Order = require("../models/order");
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
  const newOrder = new Order(req.body);

  try {
    const svdOrder = await newOrder;
    res.status(200).json(svdOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update
const edit = async (req, res) => {
  verifyAndAdmin;

  try {
    const editedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(editedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete
const deleteIt = async (req, res) => {
  verifyAndAuth;
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const get = async (req, res) => {
  verifyAndAdmin;
  try {
    const Order = await Order.findById(req.params.id);

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getEm = async (req, res) => {
  verifyAndAdmin;
  try {
    const orders = await Order.find(req.params.id);

    res.status(200).json(orders);
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
