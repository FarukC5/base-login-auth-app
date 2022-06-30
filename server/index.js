const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("MongoDB connected successfully..."))
  .catch(() => console.log(`Error connecting ${config.mongoUri}!!!`));

app.listen(config.port, (err) => {
  if (err) return console.log(err);

  console.log(`Server started on port ${config.port}`);
});
