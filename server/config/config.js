require("dotenv").config();

const config = {
  port: process.env.PORT,
  secret: process.env.SECRET_KEY,
  mongoUri: process.env.MONGO_URI,
};

export default config;
