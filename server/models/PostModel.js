const { db, bucket, uuidv4 } = require("../firebaseConfig");
const PetTypeModel = require("./PetTypeModel");

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

  static async getUserPosts(userId) {
    const postCollection = db.collection("post");

    const snapshot = await postCollection
      .where("userID", "==", userId)
      .select("postTitle", "petPic", "petType", "petDob", "status")
      .get();

    const posts = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const postData = doc.data();
        let petTypeName = null;

        if (postData.petType) {
          try {
            const petTypeDoc = await postData.petType.get();
            if (petTypeDoc.exists) {
              petTypeName = petTypeDoc.data().name;
            } else {
              console.warn(
                `Pet type document does not exist for post: ${doc.id}`
              );
            }
          } catch (error) {
            console.error(`Error fetching pet type for post: ${doc.id}`, error);
          }
        }

        return {
          id: doc.id,
          ...postData,
          petType: petTypeName,
        };
      })
    );

    return posts;
  }

  static async getPostById(id) {
    const postRef = db.collection("post").doc(id);

    const doc = await postRef.get();
    if (doc.exists) {
      const postData = doc.data();
      const petType = new PetTypeModel(postData.petType);

      return {
        id: doc.id,
        ...postData,
        petType: await petType.getName(),
      };
    } else {
      console.log("post doesn't exist");
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
    const post = await this.getPostFromDatabase();
    if (post?.petPic) {
      await this.deleteFile(post.petPic);
    }
    const isDeletePostInModel = await this.deletePostFromDatabase();
    return isDeletePostInModel;
  }

  async updateStatus(status) {
    try {
      return await this.post.update({ status });
    } catch (error) {
      return false;
    }
  }

  static async getActivePosts() {
    const snapshot = await db
      .collection("post")
      .where("status", "==", 0)
      .select("postTitle", "petType", "petBreed", "petDob", "status", "petPic")
      .get();

    const posts = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const postData = doc.data();
        const petTypeData = postData.petType
          ? await postData.petType.get()
          : null;
        return {
          id: doc.id,
          ...postData,
          petType: petTypeData ? petTypeData.data()?.name : null,
        };
      })
    );
    return posts;
  }
  async submitAnswers(answers) {
    const batch = db.batch();
    for (const { questionId, answerData } of answers) {
      const answerRef = this.post
        .collection("question")
        .doc(questionId)
        .collection("answer")
        .doc();
      batch.set(answerRef, answerData);
    }
    await batch.commit();
  }
  static async getAnswersUserId(postId) {
    const postRef = db.collection("post").doc(postId);
    const questionSnapshot = await postRef
      .collection("question")
      .limit(1)
      .get();
    const question = questionSnapshot.docs[0];
    const answers = await question.ref.collection("answer").get();
    const userIds = answers.docs.map((a) => a.data().userID);
    return userIds;
  }

  static async createPost(data, userId) {
    const petTypeRef = await PetTypeModel.getRefById(data.petType);
    if (!petTypeRef) throw new Error("Pet type ref");
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
    return new Promise((resolve, reject) => {
      blobStream.on("error", (error) => {
        console.log("blobStream error", error);
        reject(error);
      });
      blobStream.on("finish", async () => {
        const publicUri = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURIComponent(fileName)}?alt=media&token=${
          metadata.metadata.firebaseStorageDownloadTokens
        }`;
        resolve(publicUri);
      });
      blobStream.end(file.buffer);
    });
  }
}

module.exports = PostModel;
