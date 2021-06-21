require("@babel/polyfill");

delete process.env.BROWSER;
require("@babel/register");
require("./src/server");