const { db } = require("../firebaseConfig");

class PostService {
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
}
module.exports = PostService;
