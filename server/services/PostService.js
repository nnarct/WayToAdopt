const { db } = require("../firebaseConfig");
const PostModel = require("../models/Postmodel");
const UserModel = require("../models/UserModel");
const AuthenticationService = require("./AuthenticationService");

class PostService {
  async createPostWithQuestions(postData, questionsData) {
    try {
      const postId = await this.postModel.createPost(postData);
      await this.questionModel.createQuestions(postId, questionsData);
      return postId;
    } catch (error) {
      console.error("Error creating post with questions:", error);
      throw error;
    }
  }

  static async retrieveAllPost() {
    try {
      const snapshot = await db
        .collection("post")
        .select(
          "id",
          "postTitle",
          "petType",
          "petBreed",
          "petDob",
          "status",
          "petPic"
        )
        .get();
      return await Promise.all(
        snapshot.docs.map(async (doc) => {
          const postData = doc.data();
          const petTypeData = postData.petType
            ? await postData.petType.get()
            : null;
          return {
            id: doc.id,
            ...postData,
            petType: petTypeData ? petTypeData.data().name : null,
          };
        })
      );
    } catch (error) {
      console.error("Error retrieving posts: ", error);
      throw new Error("Error retrieving posts");
    }
  }

  static async retrievePostsByUser(token) {
    // get token to uid
    const uid = await AuthenticationService.getUidByToken(token);
    return await PostModel.getUserPosts(uid);
  }

  static async getPostById(id) {
    try {
      const post = await PostModel.getPostById(id);
      if (!post) {
        throw new Error("No post found");
      }
      return post;
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  }

  static async getQuestions(id) {
    const post = new PostModel(id);
    return await post.getQuestions();
  }

  static async submitAnswers(userId, postId, answers) {
    const post = new PostModel(postId);
    const batch = db.batch();
    for (const answer of answers) {
      const questionId = answer.questionId;
      const answerData = {
        answer: answer.answer,
        userID: userId,
      };

      // Reference to the specific question's answer sub-collection
      const answerRef = post.post
        .collection("question")
        .doc(questionId)
        .collection("answer")
        .doc(); // Generate a new document ID

      batch.set(answerRef, answerData);
    }
    await batch.commit();
  }
  static async getAnswersUserId(postId) {
    const post = db.collection("post").doc(postId);
    const questionSnapshot = await post.collection("question").limit(1).get();
    const question = questionSnapshot.docs[0];
    const answers = await question.ref.collection("answer").get();
    const ret = [];
    for (const a of answers.docs) {
      ret.push(a.data().userID);
    }
    return ret;
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
}
module.exports = PostService;
