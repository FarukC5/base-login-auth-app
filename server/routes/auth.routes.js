const express = require("express");
const authCtrl= require("../controllers/auth.controller");

const router = express.Router();

router.route("/api/users/login").post(authCtrl.login);

router.route("/api/users/logout").get(authCtrl.logout);

module.exports = router;