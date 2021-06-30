require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  userInfo,
  signupUser,
  loginUser,
} = require("./controller/userController");
const { checkToken } = require("./middleware/auth");
const { createProfile, getProfile } = require("./controller/profile");
const { getHome } = require("./controller/home");

const server = express();
const PORT = process.env.PORT || 5000;
const mongodbUrl = process.env.MONGO_DB;

try {
  mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.log("Mongoose error: ", err);
}
const db = mongoose.connection;

server.use(express.static(path.join(__dirname, "public")));
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.listen(PORT, () => {
  console.log(`social block listening at ${PORT}`);
});
server.get("/topbar", checkToken, userInfo);
server.post("/signup", signupUser);
server.post("/login", loginUser);
server.post("/createProfile", (req, res) => {
  createProfile(req, res);
});
server.get("/home", checkToken, getHome);
server.get("/profile/:username", getProfile);
server.get("/checkToken", checkToken);
