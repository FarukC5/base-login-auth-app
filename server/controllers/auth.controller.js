const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require("../config/config.js");

const secretKey = config.secret;

const login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "User not found!" });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match" });
    }

    const token = jwt.sign({ _id: user._id }, secretKey, {expiresIn: 600});
    res.cookie("token", token, { httpOnly: true});
    return res.status(200).json({
      token
    });
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged Out!" });
};

const requireSignin = expressJwt({
  secret: secretKey,
  algorithms: ["HS256"],
  userProperty: "auth",
  getToken: (req) => req.cookies.token,
});

module.exports = { login, logout, requireSignin };
