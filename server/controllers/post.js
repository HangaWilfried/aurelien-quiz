const Post = require("../models/posts")

module.exports = class API {
  static async fetchAllPosts(req, res) {
    try {
      const post = await Post.find();
      res.status(200).json(post)
    }catch (err){
      res.status(404).json({ message: err.message })
    }
  }
  static async fetchPostById(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post)
    }catch (err){
      res.status(404).json({ message: err.message })
    }
  }
  static async createPost(req, res) {
    const post = req.body
    try {
      await Post.create(post);
      res.status(201).json({ message: "Post created successfully" })
    }catch (err){
      res.status(400).json({ message: err.message })
    }
  }
}
