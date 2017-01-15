'use strict';

import IndexHtml from 'html-webpack-plugin';
import {HotModuleReplacementPlugin as HMR} from 'webpack';
import {lint, minify, options} from './config';

export default {
  entry: {
    app: `${__dirname}/app.js`,
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].[chunkhash].js',
    path: `${__dirname}/${options.env}`,
    pathinfo: options.env === 'development',
  },
  module: {
    preLoaders: [
      {
        test: /\.png$|\.jpg$|\.gif$/,
        loader: 'img',
        query: {
          minimize: true,
        },
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css/,
        loaders: [
          'style',
          'css?sourceMap&importLoaders=1&minimize=false&import=false',
          'postcss',
        ],
      },
      {
        test: /\.png$|\.jpg$|\.gif$/,
        loader: 'url',
        query: {
          name: '[sha512:hash].[ext]',
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.html$/,
        loader: 'html',
        query: {
          minimize: lint.html,
        },
      },
    ],
    resolve: {
      extensions: ['', '.js', '.json'],
    },
  },
  watch: true,
  devtool: 'source-map',
  plugins: [
    new HMR(),
    new IndexHtml({
      template: `${__dirname}/index.html`,
      inject: true,
      minify: minify.html,
    }),
  ],
};
