import template from "./template";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compress from "compression";
import userRoute from "./routes/users.routes";
import authRoute from "./routes/auth.routes";
const passport = require("passport");

const app = express();

app.use(express.json({ extended: false }));
app.use(compress());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/", (req, res) => {
  res.status(200).send(template());
});

app.use("/api/users", userRoute);
app.use("/api/users", authRoute);

export default app;
