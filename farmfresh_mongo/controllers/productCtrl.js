const express = require("express");
const router = express.Router();
const Product = require('../models/product')

module.exports = {
  create,
  edit,
  deleteIt,
};

function create(req, res) {
  
  const Product = new Product(req.body);
  Product.findById(req.params.id, function(err, game) {
    game.product.push(achievement);
    console.log(req.body);
    game.save(function(err) {
      res.redirect(`/products/${product._id}`);
    });
  });
}

// update
function edit(req, res){
  Product.product.id(req.params.id) = req.body

}

// delete
function deleteIt(req, res) {
  Product.findById(req.params.gameId, function(err, game){
    Product.product.id(req.params.id).remove()

  
      
      if(err){
        res.status(400).json(err)
        return
      }
      else{
        a.save(function(err) {
      if (err) return handleError(err);
      res.redirect(`/games/${req.params.gameId}`)
    })
  
    }
  })
}