const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
  name: String,
  username: String,
  password: String,
  isSeller: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
