// Starts a webpack dev server for dev environments

import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "./dev.config";

const WEBPACK_HOST = process.env.HOST || "localhost";
const WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

const serverOptions = {
  hot: true,
  host: WEBPACK_HOST,
  port: WEBPACK_PORT,
  devMiddleware: {
    publicPath: config.output.publicPath,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  },
};

const compiler = webpack(config);
const devServer = new WebpackDevServer(serverOptions, compiler);

(async () => {
  await devServer.start();
  console.log("WebpackDevServer Running");
})();