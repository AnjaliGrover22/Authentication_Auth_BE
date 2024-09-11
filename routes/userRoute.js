const express = require("express");

const { loginUser, signupUser } = require("../controllers/userController");

const app = express.Router();

app.post("/login", loginUser);
app.post("/signup", signupUser);

//or another way

// app.route("/login").post(loginuser);
// app.route("/signup").post(signupUser);

module.exports = app;
