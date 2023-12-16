const Emitter = require("events");

const emitter = new Emitter();
const MESSAGE = process.env.MESSAGE;

const callback = (...infiniteAmountOfArgs) => {
  infiniteAmountOfArgs.forEach((el) => {
    if (!el) {
      console.log("Argument not passed");
    } else {
      console.log(`Received message - ${el}`);
    }
  });
};

emitter.on("message", callback);
//emmitter.once("message", callback) // create event for only one invoking
//emitter.removeAllListeners();
//emitter.removeListener("message", callback);
emitter.emit("message", MESSAGE, "Text of second message");
