const mongoose = require("mongoose");

const { Schema } = mongoose;

const usersSchema = new Schema({
  fname: { type: String, required: true, maxLength: 50 },
  lname: { type: String, required: true, maxLength: 50 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", required: true },
  createdOn: { type: Date, default: Date.now(), required: true },
});

const profileSchema = new Schema({
  fname: { type: String, required: true, maxLength: 50 },
  lname: { type: String, required: true, maxLength: 50 },
  email: { type: String, required: true },
  username: { type: String, default: "" },
  dob: { type: String, default: "" },
  contact: { type: String, default: "" },
  profilePic: { type: String, default: "" },
  coverPic: { type: String, default: "" },
  media: [{ type: String, default: "" }],
  friends: [{ type: String, default: "" }],
});

module.exports = {
  users: mongoose.model("users", usersSchema),
  profile: mongoose.model("profile", profileSchema),
};
