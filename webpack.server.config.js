#! /usr/bin/env node

'use strict';

const red = require('chalk').red;
const path = require('path');
const pkg = require(`${process.cwd()}/package.json`);
const webpack = require('webpack');
const options = require('./config').options;

const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
const nodeModules = {};

for(const dep in deps) {
  nodeModules[dep] = `commonjs ${dep}`;
}

const config = {
  entry: {
    index: `${__dirname}/server.js`,
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].[chunkhash].js',
    path: `${process.cwd()}/dist`,
    pathinfo: options.env === 'development',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [{
      test: /\.node$/,
      loader: 'node-loader',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  target: 'node',
  externals: nodeModules,
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  node: {
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true,
    setImmediate: false,
  },
  watch: true,
  devtool: 'source-map',
};

Object.assign(exports, config);

if(process.argv[1] === __filename) {
  webpack(config)
    .watch({}, (err, stats) => {
      const assets = Object.keys(stats.compilation.assets);
      const outputFolder = stats.compilation.outputOptions.path;

      if(err) {
        return;
      }

      if(!assets.filter(allEntries => path.extname(allEntries) === '.js').length) {
        console.log(red('No usable assets found. Either you did not specify any entry points in JavaScript or compilable to JavaScript, or you have an error in your entry point(s).'));
        process.exit();
      }

      let servers = [];
      servers = assets.map(asset => `${outputFolder}/${asset}`)
        .filter(allEntries => path.extname(allEntries) === '.js')
        .map((entry, entryIndex) => {
          const newServer = require(entry);

          if(servers.length) {
            const prevServer = servers[entryIndex];

            if(prevServer) {
              prevServer.stop();
            }
          }

          newServer.serve();

          return newServer;
        });
    });
}
