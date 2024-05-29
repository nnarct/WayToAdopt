const { auth } = require("../firebaseConfig");
const UserModel = require("../models/UserModel");
const AuthenticationService = require("./AuthenticationService");

class UserService {
  static async createUser(uid, userData) {
    await UserModel.createUserDocument(uid, userData);
  }

  static async getUserByToken(token) {
    const uid = await AuthenticationService.getUidByToken(token);
    const user = await UserModel.getUserById(uid);
    return user;
  }

  static async getSubmitterInfo(userId) {
    const user = await UserModel.getUserById(userId);
    const { firstName, lastName, tel, email } = user;
    return { firstName, lastName, tel, email };
  }
  
  // async updateUser(userId, userData) {
  //   return await this.userModel.updateUser(userId, userData);
  // }
  // async deleteUser(userId) {
  //   await this.userModel.deleteUser(userId);
  //   await admin.auth().deleteUser(userId);
  // }
}

module.exports = UserService;
