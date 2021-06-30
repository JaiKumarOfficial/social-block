const jwt = require("jsonwebtoken");
const { profile } = require("../model/users");

async function getHome(req, res) {
  try {
    const friendList = [];
    const { user } = req;
    const userProfile = await profile.findOne({ email: user }).exec();
    const { friends } = userProfile;

    for (friend of friends) {
      const friendInfo = await profile
        .findOne({ email: friend }, "fname lname username profilePic")
        .exec();
      friendList.push(friendInfo);
    }

    res.status(200).json({
      success: true,
      msg: "valid",
      userProfile,
      friendList: friendList,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      msg: err.message,
    });
  }
}

module.exports = {
  getHome,
};
