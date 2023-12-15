const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const text = process.env.TEXT || "";

const writeFile = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        return reject(err.message);
      }

      resolve();
    });
  });
};

const readFile = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        return reject(err.message);
      }

      resolve(data);
    });
  });
};

const removeFile = async (path) => {
  return new Promise((resolve, reject) => {
    fs.rm(path, (err) => {
      if (err) {
        return reject(err.message);
      }

      resolve();
    });
  });
};

const pathOne = path.resolve(__dirname, "text.txt");
const pathTwo = path.resolve(__dirname, "count.txt");

writeFile(pathOne, text)
  .then(() => readFile(pathOne))
  .then((data) => writeFile(pathTwo, data.length.toString()))
  .then(() => removeFile(pathOne))
  .then(() => console.log("All done"))
  .catch((err) => console.log(err));
