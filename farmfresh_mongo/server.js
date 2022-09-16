const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./db/database");
userRouter = require("./routes/users.js");
authRouter = require("./routes/auth.js");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Farm Fresh." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

console.log("Welcome to Farm Fresh Backend");
