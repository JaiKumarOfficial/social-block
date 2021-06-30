const jwt = require("jsonwebtoken");

const checkToken = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const result = jwt.verify(token, "test");
    return res.status(200).json({ msg: "valid" });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError)
      return res.status(200).json({ msg: "invalid token" });
  }
};
module.exports = {
  checkToken,
};
