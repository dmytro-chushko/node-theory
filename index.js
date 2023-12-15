const http = require("http");

const PORT = process.env.PORT || 5000;
const COMMAND = {
  USERS: "users",
  POSTS: "posts",
};

const server = http.createServer((req, res) => {
  const currentCommand = req.url.slice(1);

  const urls = {
    [COMMAND.USERS]: () =>
      res.end(JSON.stringify([{ id: 1, name: "User One" }])),
    [COMMAND.POSTS]: () =>
      res.end(JSON.stringify([{ id: 1, post: "Post One" }])),
  };

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  return urls[currentCommand]
    ? urls[currentCommand]()
    : res.end("Waiting command...");
});

server.listen(PORT, () => console.log(`Server start on PORT ${PORT}`));
