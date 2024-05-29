const UserModel = require("../models/UserModel");
const AuthenticationService = require("./AuthenticationService");

class UserService {
  static async createUser(uid, userData) {
    const { firstName, lastName, tel, gender, dob } = userData;
    if (!firstName || !lastName || !tel || !gender || !dob)
      throw new Error("Some data is missing");
    if (typeof dob !== "number") throw new Error("Dob must be epoch number");
    await UserModel.createUserDocument(uid, userData);
  }

  static async getUserByToken(token) {
    if (!token) throw new Error("Token is missing.");
    const uid = await AuthenticationService.getUidByToken(token);
    if (!uid) throw new Error("User ID is not found, Invalid token");
    const user = await UserModel.getUserById(uid);
    if (!user) throw new Error("User data is not found.");
    return user;
  }

  static async getSubmitterInfo(userId) {
    if (!userId) throw new Error("User id is missing.");
    const user = await UserModel.getUserById(userId);
    if (!user) throw new Error("Submitter data is not found.");
    const { firstName, lastName, tel, email } = user;
    return { firstName, lastName, tel, email };
  }
}

module.exports = UserService;
