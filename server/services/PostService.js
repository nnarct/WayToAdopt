const PostModel = require("../models/Postmodel");
const UserModel = require("../models/UserModel");
const AuthenticationService = require("./AuthenticationService");
class PostService {
  static async getActivePosts() {
    try {
      const posts = await PostModel.getActivePosts();
      return posts;
    } catch (error) {
      console.error("Error retrieving posts: ", error);
      throw new Error(`Error retrieving posts: ${error.message}`);
    }
  }

  static async retrieveUsersPosts(token) {
    try {
      const uid = await AuthenticationService.getUidByToken(token);
      if (!uid) {
        throw new Error("Token invalid.");
      }
      const posts = await PostModel.getUserPosts(uid);
      return posts;
    } catch (error) {
      throw new Error(`Error while getting user's posts: ${error.message}`);
    }
  }

  static async getPostById(id) {
    try {
      const post = await PostModel.getPostById(id);
      if (!post) {
        throw new Error("No post found");
      }
      return post;
    } catch (error) {
      throw new Error(`Error getting post by Id: ${error.message}`);
    }
  }

  static async getQuestions(id) {
    try {
      const post = new PostModel(id);
      const questions = await post.getQuestions();
      return questions;
    } catch (error) {
      throw new Error(`Error getting questions by post id: ${error.message}`);
    }
  }

  static async submitAnswers(userId, postId, answers) {
    try {
      const formattedAnswers = answers.map((answer) => ({
        questionId: answer.questionId,
        answerData: {
          answer: answer.answer,
          userID: userId,
        },
      }));
      const post = new PostModel(postId);
      await post.submitAnswers(formattedAnswers);
    } catch (error) {
      console.error("Error submitting answers: ", error);
      throw new Error("Error submitting answers");
    }
  }

  static async getAnswersUserId(postId) {
    try {
      const userIds = await PostModel.getAnswersUserId(postId);
      return userIds;
    } catch (error) {
      console.error("Error retrieving user IDs for answers: ", error);
      throw new Error("Error retrieving user IDs for answers");
    }
  }

  static async getAnswerOfUser(postId, userId) {
    try {
      const post = new PostModel(postId);
      const answers = await post.getUserAnswer(userId);
      const user = await UserModel.getUserById(userId);
      return {
        user: {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          tel: user.tel,
        },
        answers,
      };
    } catch (error) {
      console.log({ error });
      throw new Error(error);
    }
  }

  static async uploadPhoto(file) {
    try {
      if (!file) {
        throw new Error("File is missing.");
      }
      const uri = await PostModel.uploadPhoto(file);
      if (uri === null || uri?.length === 0) {
        throw new Error("Upload file error");
      }
      return uri;
    } catch (error) {
      throw new Error(`Uploading file error: ${error.message}`);
    }
  }

  static async createPost(data, token) {
    try {
      const userId = await AuthenticationService.getUidByToken(token);
      const postId = await PostModel.createPost(data, userId);
      return postId;
    } catch (error) {
      console.error("Error creating post: ", error);
      throw new Error("Error creating post");
    }
  }

  static async deletePost(id) {
    try {
      const post = new PostModel(id);
      const isDelete = await post.deletePost();
      if (!isDelete) {
        return false;
      }
      if ((await PostModel.getPostFromDatabase()) === null) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  static async closePost(id) {
    try {
      const post = new PostModel(id);
      return await post.updateStatus(1); // 0 open, 1 close
    } catch (error) {
      return false;
    }
  }
  static async openPost(id) {
    try {
      const post = new PostModel(id);
      return await post.updateStatus(0); // 0 open, 1 close
    } catch (error) {
      return false;
    }
  }
}
module.exports = PostService;
