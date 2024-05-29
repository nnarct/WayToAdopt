const { auth } = require("../firebaseConfig");
const PostModel = require("../models/Postmodel");

class AuthenticationService {
  async createUser(email, password) {
    if (!email || !password) throw new Error("Email or password is missing.");
    try {
      const userRecord = await auth.createUser({
        email,
        password,
      });
      if (!userRecord) throw new Error("Create user in firebase auth failed.");
      return userRecord.uid;
    } catch (error) {
      if (error.errorInfo.code === "auth/email-already-exists") return;
      else throw new Error(error.message);
    }
  }

  static async getUidByToken(token) {
    if (!token) throw new Error("Token is missing.");
    const dat = await auth.verifyIdToken(token);
    if (!dat) throw new Error("Token is not valid.");
    return dat.uid;
  }

  static async verifyPostOwner(token, postId) {
    if (!token) throw new Error("Token missing.");
    if (!postId) throw new Error("Post ID is missing.");
    const post = new PostModel(postId);
    const ownerUid = await post.getUid();
    if (!ownerUid) throw new Error("Post owner's user ID is not found.");
    const userId = await this.getUidByToken(token);
    if (!userId) throw new Error("User's user ID is not found.");
    return userId === ownerUid;
  }
}

module.exports = AuthenticationService;
