const { AuthenticationService } = require("../services/AuthenticationService");
const UserService = require("../services/UserService");

class AuthController {
  static async createUser(req, res) {
    try {
      const { password, ...userData } = req.body;
      const uid = await AuthenticationService.createUser(
        userData.email,
        password
      );
      if (uid) {
        await UserService.createUserDocument(uid, userData);
      } else return res.status(200).json({message: "Email is already in used."})
      return res
        .status(201)
        .json({ userID: uid, message: "createUser SuccessFully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = AuthController;
