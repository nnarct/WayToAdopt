// const firebase = require("../firebaseConfig");
const { db } = require("../firebaseConfig");
const PostService = require("../services/PostService");
class PostController {
  static async createPost(req, res) {
    // try {
    //   const newPost = PostService.createPost(req.body)
    //   res.status(201).json({message: 'successfully create a post'})
    // } catch (error) {
    //   res.status(500).json({ message: error.message })
    // }
  }
  static async retrieveAllPost(req, res) {
    try {
      const allPosts = await PostService.retrieveAllPost();
      return res.status(201).json({ data: allPosts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deletePost(req, res) {}
}

module.exports = PostController;
