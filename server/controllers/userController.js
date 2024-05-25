const UserService = require("../services/UserService");

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
  // Implement other controller methods (getUserById, updateUser, deleteUser) similarly
}

module.exports = UserController;
