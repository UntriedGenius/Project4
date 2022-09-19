const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/orderCtrl");

router.post("/", orderCtrl.create);
router.put("/:id", orderCtrl.edit);
router.delete("/:id", orderCtrl.deleteIt);
router.get("/find/:userid", orderCtrl.get);
router.get("/", orderCtrl.getEm);

module.exports = router;
