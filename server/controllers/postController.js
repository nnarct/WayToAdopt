// const firebase = require("../firebaseConfig");
const PostService = require("../services/PostService");
const AuthenticationService = require("../services/AuthenticationService");

class PostController {
  static async getAllActivePost(req, res) {
    try {
      const allPosts = await PostService.getActivePosts();
      console.log({ allPosts });
      res.status(201).json({ posts: allPosts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getUserPosts(req, res) {
    try {
      const allPosts = await PostService.retrieveUsersPosts(req.body.token);
      return res.status(201).json({ posts: allPosts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getPostById(req, res) {
    try {
      const details = await PostService.getPostById(req.body.postID);
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
      console.log({ error });
      return res.status(500).json({ message: error.message });
    }
  }

  static async allAnswerUserIds(req, res) {
    const postId = req.body.postId;
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
      const post = JSON.parse(req.body.post);
      post.petPic = photoUri;
      console.log({ req });
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
  static async changePostStatus(req, res) {
    try {
      const postId = req.body.id;
      if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
      }
      if (req.body.status === 0) await PostService.openPost(postId);
      if (req.body.status === 1) await PostService.closePost(postId);
      return res.status(201).json("Closed successfully");
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ message: error.message });
    }
  }
}

module.exports = PostController;
