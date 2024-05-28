const { db, bucket } = require("../firebaseConfig");
const PostModel = require("../models/Postmodel");
const UserModel = require("../models/UserModel");
const AuthenticationService = require("./AuthenticationService");
const { v4: uuidv4 } = require("uuid");

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

  static async uploadPhoto(file) {
    const fileName = `petPic/${uuidv4()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
      contentType: file.mimetype,
      cacheControl: "public, max-age=31536000",
    };
    const blobStream = fileUpload.createWriteStream({
      metadata,
      gzip: true,
    });
    let publicUri;
    blobStream.on("error", (error) => {
      console.log("blobStream error", error);
      return null;
    });
    blobStream.on("finish", async () => {
      publicUri = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(fileName)}?alt=media&token=${
        metadata.metadata.firebaseStorageDownloadTokens
      }`;
      return publicUri;
    });
    blobStream.end(file.buffer);
    return new Promise((resolve, reject) => {
      blobStream.on("finish", () => {
        resolve(publicUri);
      });
      blobStream.on("error", (error) => {
        reject(error);
      });
    });
  }

  static async createPost(data, token) {
    const userId = await AuthenticationService.getUidByToken(token);
    const petTypeRef = db.collection("petType").doc(data.petType);
    const postRef = await db.collection("post").add({
      postTitle: data.postTitle,
      petBreed: data.petBreed,
      petGender: data.petGender,
      petDob: data.petDob,
      petVaccinated: data.petVaccinated,
      petSterilized: data.petSterilized,
      petWean: data.petWean,
      petHouseBreaking: data.petHouseBreaking,
      petPic: data.petPic,
      petType: petTypeRef,
      createdAt: Date.now(),
      status: 0,
      userID: userId,
    });
    const questions = data.questions;
    for (const questionData of questions) {
      await postRef.collection("question").add({
        question: questionData,
      });
    }
    return postRef.id;
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
}
module.exports = PostService;
