const express = require("express");
const router = express.Router();
const Product = require("../models/product");
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

// controllers

const create = async (req, res) => {
  verifyAndAuth;
  const newProduct = new Product(req.body);

  try {
    const svdProduct = await newProduct;
    res.status(200).json(svdProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update
const edit = async (req, res) => {
  verifyAndAuth;

  try {
    const editedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(editedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete
const deleteIt = async (req, res) => {
  verifyAndAuth;
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getEm = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limits(5);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    products = await Product.find(products);
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
