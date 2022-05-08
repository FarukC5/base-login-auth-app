import config from "./config/config";
import mongoose from "mongoose";
import app from "./app";

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("MongoDB connected successfully..."))
  .catch(() => console.log(`Error connecting ${config.mongoUri}!!!`));

app.listen(config.port, (err) => {
  if (err) return console.log(err);

  console.log(`Server started on port ${config.port}`);
});
