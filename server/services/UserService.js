const { auth } = require("../firebaseConfig");
const UserModel = require("../models/UserModel");
const AuthenticationService = require("./AuthenticationService");

class UserService {
  constructor(userModel, authService) {
    this.userModel = userModel;
    this.authService = authService;
  }

  async createUser(uid, userData) {
    await this.userModel.createUserDocument(uid, userData);
  }

  async getUserByToken(token) {
    const uid = await this.authService.getUidByToken(token);
    const user = await this.userModel.getUserById(uid);
    return user;
  }

  async getSubmitterInfo(userId) {
    const user = await this.userModel.getUserById(userId);
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
