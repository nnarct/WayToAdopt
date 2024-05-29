// const UserService = require("../services/UserService");
// const AuthenticationService = require("../services/AuthenticationService");

class UserController {
  constructor(userService, authService) {
    this.userService = userService;
    this.authService = authService;
    this.getUser = this.getUser.bind(this);
    this.getSubmitterInfo = this.getSubmitterInfo.bind(this);
  }
  async getUser(req, res) {
    try {
      const user = await this.userService.getUserByToken(req.body.token);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSubmitterInfo(req, res) {
    const token = req.body.token;
    const postId = req.body.postId;
    const userId = req.body.userId;
    try {
      const hasAccess = await this.authService.verifyPostOwner(token, postId);
      if (!hasAccess) {
        return res
          .status(401)
          .json({ message: "You don't have permission for this data." });
      }
      const user = await this.userService.getSubmitterInfo(userId);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
