const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productCtrl");

router.post("/", productCtrl.create);
router.put("/:id", productCtrl.edit);
router.delete("/:id", productCtrl.deleteIt);
router.get("/find/:id", productCtrl.get);
router.get("/", productCtrl.getEm);

module.exports = router;
