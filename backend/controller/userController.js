const { body, validationResult } = require("express-validator");
const { users, profile } = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userInfo = async (req, res) => {
  const { user } = req;
  const userProfile = await profile
    .findOne({ email: user }, "profilePic")
    .exec();
  if (userProfile) {
    res.status(200).json({
      success: true,
      msg: "ok",
      userProfile,
    });
  } else
    res.status(200).json({
      success: false,
      msg: "no user found",
    });
};

const signupUser = [
  body("fname").trim().escape(),
  body("lname").trim().escape(),
  body("email")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Invalid Email")
    .bail()
    .isEmail()
    .withMessage("Invalid Email")
    .toLowerCase(),
  body("email")
    .custom((email, { req }) => {
      return users.findOne({ email: email }).then((res) => {
        if (res) throw new Error("Email already in use");
      });
    })
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be: 8 characters long")
    .isStrongPassword({ minUppercase: 1 })
    .withMessage("Password must contain: 1 upper case letter")
    .isStrongPassword({ minNumbers: 1 })
    .withMessage("Password must contain: 1 digit")
    .isStrongPassword({ minSymbols: 1 })
    .withMessage("Password must contain: 1 symbol")
    .escape(),

  (req, res) => {
    console.log(req.body);
    const { fname, lname, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).send({ errors: errors.array() });
    }
    try {
      (async () => {
        const hashed_password = await bcrypt.hash(password, 10);
        const user = new users({
          fname: fname,
          lname: lname,
          email: email,
          password: hashed_password,
        });
        let result = await user.save();
        const newProfile = new profile({
          fname: fname,
          lname: lname,
          email: email,
        });
        newProfile.save();
        console.log(result);
      })();
    } catch (err) {
      console.log(err);
    }
    // issue jwt
    const payload = {
      user: email,
      role: "user",
    };
    const jwtToken = jwt.sign(payload, process.env.JWT_TOKEN);
    res.status(201).json({
      token: jwtToken,
      msg: "created",
    });
  },
];

const loginUser = [
  body("email")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid Email")
    .toLowerCase()
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .escape(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // const db = connectDB();
    (async () => {
      try {
        const result = await users.findOne({ email: email }).exec();
        if (!result) {
          errors.errors.push({
            value: email,
            msg: "Email does not exist",
            param: "email",
            location: "body",
          });
          return res.status(200).json({
            errors: errors.array(),
            msg: "error",
          });
        } else {
          const checkPassword = await bcrypt.compare(password, result.password);
          if (checkPassword) {
            // issue jwt
            const payload = {
              user: email,
              role: "user",
            };
            const token = jwt.sign(payload, process.env.JWT_TOKEN);
            return res.status(200).json({
              token: token,
              msg: "authenticated",
            });
          } else {
            errors.errors.push({
              value: password,
              msg: "Incorrect Password",
              param: "password",
              location: "body",
            });
            return res.status(200).json({
              msg: "error",
              errors: errors.array(),
            });
          }
        }
      } catch (err) {
        console.log("login user", err);
      }
    })();
  },
];

module.exports = {
  signupUser,
  loginUser,
  userInfo,
};
