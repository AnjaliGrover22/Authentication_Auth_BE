const express = require("express");

const { getPosts, createPost } = require("../controllers/postController");
const requireAuth = require("../middlewares/requireAuth");

const app = express.Router();

app.use(requireAuth);

app.route("/").get(getPosts).post(createPost);

module.exports = app;
