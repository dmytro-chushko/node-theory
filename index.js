const Application = require("./framework/Application");
const userRouter = require("./src/user-router");
const jsonParser = require("./framework/parseJson");
const parseUrl = require("./framework/parseUrl");
const bodyParse = require("./framework/bodyParse");

const PORT = process.env.PORT || 5000;

const app = new Application();

app.use(jsonParser, bodyParse, parseUrl("http://localhost:5000"));

app.addRouter(userRouter);

app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`));
