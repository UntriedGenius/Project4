const express = require("express");
const router = express.Router();
const productsCtrl = require("../controllers/productCtrl");

router.get("/", productsCtrl.getAll);
router.delete("/:id", libraryCtrl.deleteIt);
router.put("/:id", libraryCtrl.removeBook);

module.exports = router;
