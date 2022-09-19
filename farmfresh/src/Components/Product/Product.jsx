import React from "react";
import "./Product.css"

const Product = () => {
  return(
  <div className="container">
    <div className="productimage">
      <img src="" alt="Image goes Here" />
    </div>
    <div className="productinfo">
      <ul>
        <li> title</li>
        <li> description</li>
        <li> img</li>
        <li> categories</li>
        <li> Poster</li>
        <li> Price</li>
      </ul>
    </div>
  </div>
  )
};

export default Product;
