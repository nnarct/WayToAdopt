const { auth } = require("../firebaseConfig");
const PostModel = require("../models/Postmodel");

class AuthenticationService {
  async createUser(email, password) {
    try {
      const userRecord = await auth.createUser({
        email,
        password,
      });
      return userRecord.uid;
    } catch (error) {
      if (error.errorInfo.code === "auth/email-already-exists") return;
      else throw new Error(error.message);
    }
  }

  async getUidByToken(token) {
    const dat = await auth.verifyIdToken(token);
    return dat.uid;
  }
  static async getUidByToken(token) {
    const dat = await auth.verifyIdToken(token);
    return dat.uid;
  }

  async verifyPostOwner(token, postId) {
    const post = new PostModel(postId);
    const ownerUid = await post.getUid();
    const userId = await this.getUidByToken(token);
    return userId === ownerUid;
  }
}

module.exports = AuthenticationService;
