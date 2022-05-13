// This is the webpack config to use during development.
import path from "path";
import webpack from "webpack";
import WebpackErrorNotificationPlugin from "webpack-error-notification";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

import WriteStats from "./utils/WriteStats";

const dist = path.resolve(__dirname, '../public/assets');
const host = 'localhost';
const port = parseInt(process.env.PORT) + 1 || 3001;

export default {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    '@babel/polyfill',
    './src/app/client.js'
  ],
  output: {
    filename: '[name]-[fullhash].js',
    path: dist,
    publicPath: 'http://' + host + ':' + port + '/assets/'
  },
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          },
        ]
      },
      {
        test: /\.(s?css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: './webpack/',
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
    ]
  },

  optimization: {
    moduleIds: 'named'
  },

  plugins: [
    // hot reload
    new ReactRefreshWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        APP_NAME: JSON.stringify(process.env.APP_NAME),
        BROWSER: JSON.stringify(true),
      }
    }),
    new WebpackErrorNotificationPlugin(),

    // stats
    new WriteStats(),

    // print a webpack progress
    new webpack.ProgressPlugin(function (percentage, message) {
      var MOVE_LEFT = new Buffer.from("1b5b3130303044", "hex").toString();
      var CLEAR_LINE = new Buffer.from("1b5b304b", "hex").toString();
      process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + "% :" + message + MOVE_LEFT);
    })
  ]
};