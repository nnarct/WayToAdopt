// const firebase = require("../firebaseConfig");
const { db, bucket } = require("../firebaseConfig");
const PostService = require("../services/PostService");
const AuthenticationService = require("../services/AuthenticationService");
const { v4: uuidv4 } = require("uuid");
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

  static async getPostById(req, res) {
    const id = req.body.postID;

    try {
      const details = await PostService.getPostById(id);
      return res.status(201).json(details);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getQuestions(req, res) {
    const id = req.body.postID;
    try {
      const questions = await PostService.getQuestions(id);
      return res.status(201).json(questions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async sendAnswer(req, res) {
    //array of objects
    // object = {answer: string, userID: string, , questionID}
    const postId = req.body.postId;
    const answers = req.body.answers;
    const token = req.body.token;
    const userId = await AuthenticationService.getUidByToken(token);
    try {
      const questions = await PostService.submitAnswers(
        userId,
        postId,
        answers
      );
      return res.status(201).json(questions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async allAnswerUserIds(req, res) {
    const postId = req.body.postId;
    // const userId = req.body.userId;

    const token = req.body.token;
    try {
      const hasAccess = await AuthenticationService.verifyPostOwner(
        token,
        postId
      );
      if (!hasAccess) {
        return res
          .status(401)
          .json({ message: "You don't have permission for this data." });
      }
      const ids = await PostService.getAnswersUserId(postId);
      return res.status(201).json(ids);
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: error.message });
    }
  }
  static async getAnswer(req, res) {
    const postId = req.body.postId;
    const userId = req.body.userId;
    const token = req.body.token;
    try {
      const hasAccess = await AuthenticationService.verifyPostOwner(
        token,
        postId
      );
      if (!hasAccess) {
        return res
          .status(401)
          .json({ message: "You don't have permission for this data." });
      }
      const data = await PostService.getAnswerOfUser(postId, userId);
      return res.status(201).json(data);
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: error.message });
    }
  }

  static async createNewPost(req, res) {
    try {
      const file = req.file;
      const photoUri = await PostService.uploadPhoto(file);
      if (photoUri === null || photoUri?.length === 0) {
        return res.status(500).send({ message: "Upload photo error" });
      }
      const post = JSON.parse(req.body.post);
      post.petPic = photoUri;
      const resp = await PostService.createPost(post, req.body.token);
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  static async deletePost(req, res) {
    try {
      const postId = req.body.id;
      if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
      }
      await PostService.deletePost(postId);
      return res.status(201).json("Deleted successfully");
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}

module.exports = PostController;
