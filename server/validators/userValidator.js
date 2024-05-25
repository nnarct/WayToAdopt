const { body, validationResult } = require("express-validator");
class Validator {
  constructor() {
    // Bind the instance method
    this.isEpoch = this.isEpoch.bind(this);
  }

  isEpoch(value) {
    const epoch = parseInt(value, 10);
    // Check if the parsed value is a number and falls within a reasonable range
    return !isNaN(epoch) && epoch > 0 && epoch < 2147483647000; // 2147483647000 corresponds to January 19, 2038
  }

  static createUser() {
    const instance = new Validator();
    return [
      body("email").isEmail().withMessage("Invalid email format"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
      body("dob")
        .custom(instance.isEpoch)
        .withMessage("Invalid date of birth formatsdd"),
      body("gender").isIn([0, 1, 2]).withMessage("Invalid gender"),
      body("tel").isMobilePhone().withMessage("Invalid phone number"),
      body("firstName").notEmpty().withMessage("First name is required"),
      body("lastName").notEmpty().withMessage("Last name is required"),

      // Middleware to check for validation errors
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
    ];
  }
}

module.exports = Validator;
