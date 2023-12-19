// const http = require("http");
const Application = require("./framework/Application");
const userRouter = require("./src/user-router");
const jsonParser = require("./framework/parseJson");

const PORT = process.env.PORT || 5000;

// const PATH = {
//   USERS: "users",
//   POSTS: "posts",
// };

// const server = http.createServer((req, res) => {
//   const currentPath = req.url.slice(1);

//   const urls = {
//     [PATH.USERS]: () =>
//       res.end(JSON.stringify([{ id: 1, name: "User One" }])),
//     [PATH.POSTS]: () =>
//       res.end(JSON.stringify([{ id: 1, post: "Post One" }])),
//   };

//   res.writeHead(200, {
//     "Content-Type": "application/json",
//   });

//   return urls[currentPath]
//     ? urls[currentPath]()
//     : res.end("Waiting command...");
// });

const app = new Application();

app.use(jsonParser);

app.addRouter(userRouter);

app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`));
