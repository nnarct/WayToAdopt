const { db } = require("../firebaseConfig");
class UserModel {
  async createUserDocument(userId, userData) {
    const userCollection = db.collection("user");
    return await userCollection.doc(userId).set(userData);
  }

  async getUserById(userId) {
    const userCollection = db.collection("user");
    const userDoc = await userCollection.doc(userId).get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    return { id: userDoc.id, ...userDoc.data() };
  }

  // async updateUser(userId, userData) {
  //   await this.userCollection.doc(userId).update(userData);
  //   const updatedUserDoc = await this.userCollection.doc(userId).get();
  //   return { id: updatedUserDoc.id, ...updatedUserDoc.data() };
  // }

  // async deleteUser(userId) {
  //   await this.userCollection.doc(userId).delete();
  // }
}

module.exports = UserModel;
