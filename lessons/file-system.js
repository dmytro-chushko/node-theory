const fs = require("fs");
const path = require("path");

// Create directory

fs.mkdirSync(path.resolve(__dirname, "dir")); //synchroniusly creates a directory
fs.mkdirSync(path.resolve(__dirname, "dir", "dir2"), { recursive: true }); // synchroniusly creates any number of included directories.

console.log("Start");

fs.mkdir(path.resolve(__dirname, "dir"), (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log("Directory has been created");
}); // asynchroniusly create a directory; second argument of mkdir method is callback which receive the error as a parameter

console.log("End");

// Remove directory

fs.rmdir(path.resolve(__dirname, "dir"), (err) => {
  if (err) {
    throw err;
  }

  console.log("Directory has removed");
});

// Write file

fs.writeFile(
  path.resolve(__dirname, "test.txt"),
  "string for writing to the file",
  (err) => {
    if (err) {
      throw err;
    }

    console.log("File has been written in");
  }
);

// Add data to the file

fs.appendFile(path.resolve(__dirname, "test.txt"), "added data", (err) => {
  if (err) {
    throw err;
  }

  console.log("Data has been added to the file");
});

// Use promise

const writeFileAsync = async (path, data) => {
  return new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err) => {
      if (err) {
        return reject(err.message);
      }

      resolve();
    })
  );
};

const appendFileAsync = async (path, data) => {
  return new Promise((resolve, reject) =>
    fs.appendFile(path, data, (err) => {
      if (err) {
        return reject(err.message);
      }

      resolve();
    })
  );
};

const readFileAsync = async (path) => {
  return new Promise((resolve, reject) =>
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        return reject(err.message);
      }

      resolve(data);
    })
  );
};

const removeFileAsync = async (path) => {
  return new Promise((resolve, reject) =>
    fs.rm(path, (err) => {
      if (err) {
        return reject(err.message);
      }

      resolve();
    })
  );
};

const filePath = path.resolve(__dirname, "test.txt");

writeFileAsync(filePath, "some new data")
  .then(() => appendFileAsync(filePath, "add 1"))
  .then(() => appendFileAsync(filePath, "add 2"))
  .then(() => readFileAsync(filePath))
  .then((data) => {
    console.log(data);

    return removeFileAsync(filePath);
  })
  .catch((err) => console.log(err));
