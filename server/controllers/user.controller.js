const User = require("../models/user.model");
const errorHandler = require("../helpers/dbErrorHandler");

const create = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    const newUser = new User(req.body);

    newUser.save((err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ error: errorHandler.getErrorMessage(err) });
      }
      res.status(200).json({ message: "Successfully registered!" });
    });
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    res.json(users);
  }).select("name email");
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  });
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.status(200).json(req.profile);
};

module.exports = { create, list, userByID, read };
