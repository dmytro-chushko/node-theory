const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

const PATH = {
  USERS: "users",
  POSTS: "posts",
};

const server = http.createServer((req, res) => {
  const currentPath = req.url.slice(1);

  const urls = {
    [PATH.USERS]: () => res.end(JSON.stringify([{ id: 1, name: "User One" }])),
    [PATH.POSTS]: () => res.end(JSON.stringify([{ id: 1, post: "Post One" }])),
  };

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  return urls[currentPath]
    ? urls[currentPath]()
    : res.end("Waiting command...");
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
