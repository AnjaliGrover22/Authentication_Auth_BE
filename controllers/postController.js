const Post = require("../schemas/Post");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts.length) {
      return res.status(200).json({ message: "No posts found in DB" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, text } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!text) {
    emptyFields.push("text");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const post = await Post.create({ title, text });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPosts, createPost };
