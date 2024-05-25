const { auth, db } = require("../firebaseConfig");
const PostModel = require("../models/Postmodel");
const  AuthenticationService  = require("./AuthenticationService");

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
}
module.exports = PostService;
