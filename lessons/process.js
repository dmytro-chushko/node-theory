const dotenv = require("dotenv");

dotenv.config(); // for storing env var in env file

console.log(process.pid); // returns ID of the uniq process

console.log(process.env.PORT); // returns value of env var, and lets to set the value

console.log(process.argv); //any arguments that were wrote after running script will be return in process.argv array

// process.exit() //stops the app
