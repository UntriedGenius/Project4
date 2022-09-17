const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");

router.put("/:id", userCtrl.edit);

module.exports = router;
