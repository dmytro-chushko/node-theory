// Readable - reading;
// Writable - writing;
// Duplex - writing + reading;
// Transform - Like Duplex, but can changes the data during reading;

const fs = require("fs");
const path = require("path");
const http = require("http");

// fs.readFile(path.resolve(__dirname, "text.txt"), (err, data) => {
//   if (err) {
//     throw err;
//   }

//   console.log(data);
// });

// Reading

// const stream = fs.createReadStream(path.resolve(__dirname, "text.txt"));

// stream.on("data", (chunk) => {
//   console.log(chunk); // one chunk equals 64K by default
// });

// stream.on("end", () => console.log("Reading finished"));
// stream.on("open", () => console.log("Reading started"));
// stream.on("error", (err) => console.log(err));

// Writing

// const writableStream = fs.createWriteStream(
//   path.resolve(__dirname, "text2.txt")
// );

// for (let i = 0; i < 20; i++) {
//   writableStream.write(i + "\n");
// }

// writableStream.end();
// writableStream.close();
// writableStream.destroy();
// writableStream.on("error");

http.createServer((req, res) => {
  //req - readable stream
  //res - writable stream
  const stream = fs.createReadStream(path.resolve(__dirname, "test.txt"));

  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", (chunk) => res.end());

  //But file reads faster than user can download it
  //For synchronizing stream reading speed and user downloading speed
  stream.pipe(res);
});
