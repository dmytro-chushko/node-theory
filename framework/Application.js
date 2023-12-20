const http = require("http");
const EventEmitter = require("events");
const bodyParse = require("./bodyParse");

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(...middlewares) {
    this.middlewares.push(...middlewares);
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];

      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];

          this.middlewares.forEach((middleware) => middleware(req, res));

          handler(req, res);
        });
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      this.middlewares.forEach((middleware) => middleware(req, res));

      req.on("end", () => {
        const emmited = this.emitter.emit(
          this._getRouteMask(req.pathname, req.method),
          req,
          res
        );
        if (!emmited) {
          res.end("Path not found");
        }
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
};
