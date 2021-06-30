const { profile } = require("../model/users");
// const { connectDB } = require("../model/connectDB");

const createProfile = (req, res) => {
  // do validation
  const { fname, lname, email, contact, dob, profilePic, coverPic, media } =
    req.body;
  try {
    const newProfile = new profile({
      fname,
      lname,
      email,
      dob: dob || null,
      contact: contact || null,
      profilePic: profilePic || null,
      coverPic: coverPic || null,
      media,
    });
    newProfile
      .save()
      .then((result) => {
        console.log(result);
        return res.send("profile updated");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

async function getProfile(req, res) {
  try {
    const friendList = [];
    const { username } = req.params;

    const userProfile = await profile.findOne({ username }).exec();
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
  createProfile: createProfile,
  getProfile: getProfile,
};
