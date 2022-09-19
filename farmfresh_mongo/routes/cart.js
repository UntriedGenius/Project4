const express = require("express");
const router = express.Router();
const cartCtrl = require("../controllers/cartCtrl");

router.post("/", cartCtrl.create);
router.put("/:id", cartCtrl.edit);
router.delete("/:id", cartCtrl.deleteIt);
router.get("/find/:userid", cartCtrl.get);
router.get("/", cartCtrl.getEm);

module.exports = router;
