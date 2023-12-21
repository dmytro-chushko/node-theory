const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Application = require("./framework/Application");
const userRouter = require("./src/user-router");
const jsonParser = require("./framework/parseJson");
const parseUrl = require("./framework/parseUrl");
const bodyParse = require("./framework/bodyParse");

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "";
const DB_HOST = process.env.DB_HOST || "";

const app = new Application();

app.use(jsonParser, bodyParse, parseUrl(HOST));

app.addRouter(userRouter);

const start = async () => {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
