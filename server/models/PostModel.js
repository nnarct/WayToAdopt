const { db, bucket } = require("../firebaseConfig");

class PostModel {
  constructor(id) {
    this.post = db.collection("post").doc(id);
  }

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
      .select("postTitle", "petPic", "petType", "petDob", "status")
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

  static async getPostById(id) {
    const postRef = db.collection("post").doc(id);

    const doc = await postRef.get();
    if (doc.exists) {
      const postData = doc.data();
      const petTypeData = postData.petType
        ? await postData.petType.get()
        : null;
      return {
        id: doc.id,
        ...postData,
        petType: petTypeData ? petTypeData.data().name : null,
      };
    }
    return null;
  }

  static async getPostRefById(id) {
    const postRef = db.collection("post").doc(id);
    const postDoc = await postRef.get();
    if (!postDoc.exists) {
      throw new Error(`No post found with ID: ${id}`);
    }

    return postDoc;
  }

  static async getQuestionsByPostID(id) {
    const postDoc = await this.getPostRefById(id);
    const questionsRef = postDoc.ref.collection("question");
    const questionsSnapshot = await questionsRef.get();

    if (questionsSnapshot.empty) {
      console.log("No questions found for this post.");
      return [];
    }

    const questions = [];
    questionsSnapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() });
    });

    return questions;
  }

  static async getPostIdByQuestionId(id) {
    const postsSnapshot = await db.collection("post").get();

    for (const postDoc of postsSnapshot.docs) {
      const questionsSnapshot = await postDoc.ref.collection("question").get();
      for (const questionDoc of questionsSnapshot.docs) {
        if (questionDoc.id === id) {
          return postDoc.id;
        }
      }
    }
    return null;
  }

  async getQuestions() {
    try {
      const questionsSnapshot = await this.post.collection("question").get();

      return questionsSnapshot.docs.map((questionDoc) => {
        return { id: questionDoc.id, ...questionDoc.data() };
      });
    } catch (error) {
      console.error("Error getting questions: ", error);
      throw error;
    }
  }

  async getUid() {
    const postSnapshot = await this.post.get();
    if (postSnapshot.exists) {
      const postData = postSnapshot.data();
      return postData.userID;
    }
    return null;
  }

  async getUserAnswer(userID) {
    // const post = await db.collection("post").doc(postId);
    const question = await this.post.collection("question").get();
    let i = 0;
    const answers = [];
    for (const q of question.docs) {
      const ans = await q.ref
        .collection("answer")
        .where("userID", "==", userID)
        .limit(1)
        .get();
      answers.push({
        question: q.data().question,
        answer: ans.docs[0].data().answer,
      });
      i++;
    }
    return answers;
  }

  static extractFilePath(petPicUrl) {
    const matches = petPicUrl.match(/o\/(.*?)\?alt=media/);
    return matches?.[1] ? decodeURIComponent(matches[1]) : null;
  }

  async deleteFile(petPicUrl) {
    try {
      const filePath = this.extractFilePath(petPicUrl);
      await bucket.file(filePath).delete();
      return true;
    } catch (error) {
      return false;
    }
  }

  async getPostFromDatabase() {
    try {
      const doc = await this.post.get();
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    } catch (error) {
      console.error("Error getting post from database:", error);
      return null;
    }
  }
  async deletePostFromDatabase() {
    try {
      await this.post.delete();
      return true;
    } catch (error) {
      return false;
    }
  }

  async deletePost() {
    console.log("delete post in model");
    const post = await this.getPostFromDatabase();
    if (post?.petPic) {
      await this.deleteFile(post.petPic);
    }
    const isDeletePostInModel = await this.deletePostFromDatabase();
    console.log({ isDeletePostInModel });
    return isDeletePostInModel;
  }
  
  async updateStatus(status) {
    try {
      return await this.post.update({ status });
    } catch (error) {
      return false
    }
  }

  // Implement other model methods (getPostById, updatePost, deletePost) similarly
}

module.exports = PostModel;
