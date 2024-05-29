const UserModel = require("../models/UserModel");
const AuthenticationService = require("./AuthenticationService");

class UserService {

  async createUser(uid, userData) {
    await UserModel.createUserDocument(uid, userData);
  }

  async getUserByToken(token) {
    const uid = await AuthenticationService.getUidByToken(token);
    const user = await UserModel.getUserById(uid);
    return user;
  }

  static async getSubmitterInfo(userId) {
    const user = await UserModel.getUserById(userId);
    const { firstName, lastName, tel, email } = user;
    return { firstName, lastName, tel, email };
  }
}

module.exports = UserService;
