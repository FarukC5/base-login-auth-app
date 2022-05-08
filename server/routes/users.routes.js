import express from "express";
import userCtrl from "../controllers/user.controller";

const router = express.Router();

router.route("/register").post(userCtrl.register);

export default router;
