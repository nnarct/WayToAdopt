const { admin } = require("../firebaseConfig");
const UserModel = require("../models/UserModel");

class UserService {
  static async createUserDocument(uid, userData) {
    await UserModel.createUser(uid, userData);
  }

  async getUserById(userId) {
    return await this.userModel.getUserById(userId);
  }

  async updateUser(userId, userData) {
    return await this.userModel.updateUser(userId, userData);
  }

  async deleteUser(userId) {
    await this.userModel.deleteUser(userId);
    await admin.auth().deleteUser(userId);
  }
}

module.exports = UserService;
