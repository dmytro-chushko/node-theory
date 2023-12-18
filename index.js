const http = require("http");
const EventEmitter = require("events");

const PORT = process.env.PORT || 5000;

const emitter = new EventEmitter();
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

class Router {
  constructor() {
    this.endpoints = {};
  }

  request(method = "GET", path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`${method} by the address ${path} already exist`);
    }

    endpoint[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (req, res) => {
      handler(req, res);
    });
  }

  get(path, handler) {
    this.request("GET", path, handler);
  }

  post(path, handler) {
    this.request("POST", path, handler);
  }

  put(path, handler) {
    this.request("PUT", path, handler);
  }

  delete(path, handler) {
    this.request("DELETE", path, handler);
  }
}

const router = new Router();

router.get("/users", (req, res) => {
  res.end("YOU SEND REQEST TO /USERS");
});

router.get("/posts", (req, res) => {
  res.end("YOU SEND REQUEST TO /POSTS");
});

const server = http.createServer((req, res) => {
  const emmited = emitter.emit(`[${req.url}]:[${req.method}]`, req, res);
  if (!emmited) {
    res.end("Path not found");
  }
});

server.listen(PORT, () => console.log(`Server start on PORT ${PORT}`));
