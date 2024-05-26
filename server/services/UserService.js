const {auth } = require("../firebaseConfig");
const UserModel = require("../models/UserModel");
const AuthenticationService = require("./AuthenticationService");

class UserService {
  static async createUserDocument(uid, userData) {
    await UserModel.createUser(uid, userData);
  }

  static async getUserByToken(token) {
    const uid = await AuthenticationService.getUidByToken(token);
    const user = await UserModel.getUserById(uid)
    return user;
  }

  async updateUser(userId, userData) {
    return await this.userModel.updateUser(userId, userData);
  }

  // async deleteUser(userId) {
  //   await this.userModel.deleteUser(userId);
  //   await admin.auth().deleteUser(userId);
  // }
}

module.exports = UserService;
