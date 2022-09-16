const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");

router.post("/register", userCtrl.create);
router.post("/login", userCtrl.login);

// router.post("/register", async (req, res) => {
//   const newUser = new User({
//     name: req.body.name,
//     username: req.body.username,
//     email: req.body.email,
//     password: CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SECRET
//     ).toString(),
//   });

//   try {
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
