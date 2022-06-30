require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,
  secret: process.env.SECRET_KEY || "base-login-app",
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb+srv://farukc:mongofaruk@cluster0.bvdt0.mongodb.net/dataBaseProject?retryWrites=true&w=majority",
};

module.exports = config;
