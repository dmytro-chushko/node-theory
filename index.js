const http = require("http");
const EventEmitter = require("events");

const PORT = process.env.PORT || 5000;

const emitter = new EventEmitter();
// const COMMAND = {
//   USERS: "users",
//   POSTS: "posts",
// };

// const server = http.createServer((req, res) => {
//   const currentCommand = req.url.slice(1);

//   const urls = {
//     [COMMAND.USERS]: () =>
//       res.end(JSON.stringify([{ id: 1, name: "User One" }])),
//     [COMMAND.POSTS]: () =>
//       res.end(JSON.stringify([{ id: 1, post: "Post One" }])),
//   };

//   res.writeHead(200, {
//     "Content-Type": "application/json",
//   });

//   return urls[currentCommand]
//     ? urls[currentCommand]()
//     : res.end("Waiting command...");
// });

class Router {
  constructor() {
    this.endpoints = {};
  }

  request(method = "GET", path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoint[path];

    if (endpoint[method]) {
      throw new Error(`${method} by the address ${path} already exist`);
    }

    endpoint[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (req, res) => {
      handler(req, res);
    });
  }
}

const router = new Router();

server.listen(PORT, () => console.log(`Server start on PORT ${PORT}`));
