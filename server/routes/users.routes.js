const express = require("express");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router.route("/api/users/:userId").get(authCtrl.requireSignin, userCtrl.read);

router.param("userId", userCtrl.userByID);

module.exports = router;
