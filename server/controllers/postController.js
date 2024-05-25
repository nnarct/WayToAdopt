// const firebase = require("../firebaseConfig");
const { db } = require("../firebaseConfig");
const PostService = require("../services/PostService");
class PostController {
  constructor(postService) {
    this.postService = postService;
  }
  static async createPostWithQuestions(req, res) {
    try {
      const { postData, questionsData } = req.body;
      const postService = new PostService();
      const postId = await postService.createPostWithQuestions(
        postData,
        questionsData
      );
      res
        .status(201)
        .json({ message: "Post and questions created successfully.", postId });
    } catch (error) {
      console.error("Error creating post with questions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  // static async createPost(req, res) {
  //   // try {
  //   //   const newPost = PostService.createPost(req.body)
  //   //   res.status(201).json({message: 'successfully create a post'})
  //   // } catch (error) {
  //   //   res.status(500).json({ message: error.message })
  //   // }
  // }
  static async retrieveAllPost(req, res) {
    try {
      const allPosts = await PostService.retrieveAllPost();
      return res.status(201).json({ data: allPosts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async retrievePostsByUser(req, res) {
    try {
      const allPosts = await PostService.retrievePostsByUser(req.body.token);
      return res.status(201).json({ data: allPosts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deletePost(req, res) {}
}

module.exports = PostController;
