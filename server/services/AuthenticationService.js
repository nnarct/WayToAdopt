const { auth } = require("../firebaseConfig");

class AuthenticationService {
  static async createUser(email, password) {
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
  static async getUidByToken(token) {
    const dat = await auth.verifyIdToken(token);
    return dat.uid;
  }
}

module.exports = AuthenticationService;
