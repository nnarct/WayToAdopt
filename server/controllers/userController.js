const UserService = require("../services/UserService");
const AuthenticationService = require("../services/AuthenticationService");

class UserController {
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserByToken(req, res) {
    try {
      const user = await UserService.getUserByToken(req.body.token);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getSubmitterInfo(req, res) {
    const token = req.body.token;
    const postId = req.body.postId;
    const userId = req.body.userId;
    try {
      const hasAccess = await AuthenticationService.verifyPostOwner(
        token,
        postId
      );
      if (!hasAccess) {
        return res
          .status(401)
          .json({ message: "You don't have permission for this data." });
      }
      const user = await UserService.getSubmitterInfo(userId);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Implement other controller methods (getUserById, updateUser, deleteUser) similarly
}

module.exports = UserController;
