const { db } = require("../firebaseConfig");
class UserModel {
  async createUserDocument(userId, userData) {
    const userCollection = db.collection("user");
    return await userCollection.doc(userId).set(userData);
  }

  static async getUserById(userId) {
    const userCollection = db.collection("user");
    const userDoc = await userCollection.doc(userId).get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    return { id: userDoc.id, ...userDoc.data() };
  }

}

module.exports = UserModel;
