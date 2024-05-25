const { db } = require("../firebaseConfig");
const PetType = require("./PetType");
class PostModel {
  static async createPost(postData) {
    try {
      const { postTitle, createdAt, petDob } = postData;
      const postCollection = db.collection("post");
      const newPostRef = postCollection.doc();
      await newPostRef.set({
        postTitle,
        createdAt,
        petDob,
        status: 0,
      });
      return newPostRef.id;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  //   async createPost(userId, postData) {
  //       const { questions, ...postDataWithoutQuestions } = postData;
  //       if (!questions || questions.length === 0) {
  //           throw new Error('At least one question is required for a post.');
  //       }

  //       const newPost = this.postsCollection.doc();
  //       await newPost.set({ userId, ...postDataWithoutQuestions });

  //       // Add questions to the post
  //       await Promise.all(questions.map(async (question) => {
  //           await newPost.collection('questions').add(question);
  //       }));

  //       return { id: newPost.id, ...postDataWithoutQuestions, questions };
  //   }

  static async getUserPosts(userId) {
    const postCollection = db.collection("post");

    const snapshot = await postCollection
      .where("userID", "==", userId)
      .select("postTitle", "petPic", "petType", "petDob")
      .get();
    const posts = [];
    await Promise.all(
      snapshot.docs.map(async (doc) => {
        const postData = doc.data();
        const petTypeData = postData.petType
          ? await postData.petType.get()
          : null;
        posts.push({
          id: doc.id,
          ...postData,
          petType: petTypeData ? petTypeData.data().name : null,
        });
        // const questionsSnapshot = await doc.ref.collection("questions").get();
        // const questions = [];
        // questionsSnapshot.forEach((questionDoc) => {
        //   questions.push({ id: questionDoc.id, ...questionDoc.data() });
        // });
        // posts.push({ id: doc.id, ...postData, questions });
      })
    );
    return posts;
  }

  // Implement other model methods (getPostById, updatePost, deletePost) similarly
}

module.exports = PostModel;
