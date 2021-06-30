const jwt = require("jsonwebtoken");
const { users } = require("../model/users");

const checkToken = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      try {
        const result = jwt.verify(token, process.env.JWT_TOKEN);
        const db_result = await users.findOne({ email: result.user }).exec();

        if (db_result) {
          req.user = result.user;
          next();
        } else
          return res.status(404).json({
            success: false,
            msg: "user does not exist",
          });
      } catch (err) {
        if (err instanceof jwt.JsonWebTokenError)
          return res.status(200).json({
            success: false,
            msg: "invalid token",
          });
      }
    } else
      return res.status(401).json({
        success: false,
        msg: "no token found",
      });
  } else
    return res.status(401).json({
      success: false,
      msg: "no token found",
    });
};
module.exports = {
  checkToken,
};
