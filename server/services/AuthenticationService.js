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
}

module.exports = { AuthenticationService };
