import express from "express";
import render from "./app/render";

// Initialize express server
const server = express();
server.use('/static', express.static('./src/assets/static'));

// On development, serve the static files from the webpack dev server.
require("../webpack/server");
server.use(render);

// Generic server errors (e.g. not caught by components)
server.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
  console.log("Error on request %s %s", req.method, req.url);
  console.log(err);
  console.log(err.stack);
});

// Finally, start the express server
server.set("port", process.env.PORT || 3000);
server.listen(server.get("port"), () => {
  console.log(`Express server listening on ${server.get("port")}`);
});