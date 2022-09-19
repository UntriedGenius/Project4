const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");

router.put("/:id", userCtrl.edit);
router.delete("/:id", userCtrl.deleteIt);
router.get("/find/:id", userCtrl.get);
router.get("/", userCtrl.getEm);
router.get("/stats", userCtrl.stats);

module.exports = router;
