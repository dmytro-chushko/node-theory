const path = require("path");

console.log(path.join(__dirname, "first", "second", "third")); // joins parts of diferent pathes, __dirname - absolute path to the current directory, pastes slash by itself
console.log(path.resolve("first", "second", "third")); // allready has  absolute path to the current directory, but might has unexpectabe behavior and it is better to use path.join

const fullpath = path.join(__dirname, "first", "second", "third.js");

console.log(path.parse(fullpath));
//returns {
//   root: 'D:\\',
//   dir: 'D:\\Sync\\Dev\\node-theory\\lessons\\first\\second',
//   base: 'third.js',
//   ext: '.js',
//   name: 'third'
// }

console.log("Step - ", path.step); // ?
console.log("isAbsolute - ", path.isAbsolute(fullpath)); // boolean value, it checks if the path is absolute
console.log("Basename - ", path.basename(fullpath)); // returns name of file
console.log("Extname - ", path.extname(fullpath)); // returns extension of file or empty string if extension is absand

const siteURL = "http://lcalhost:8080/users?id=5123";

const url = new URL(siteURL);

console.log(url);
