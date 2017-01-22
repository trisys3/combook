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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              minimize: false,
              import: false,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.png$|\.jpg$|\.gif$/,
        use: [
          {
            loader: 'img-loader',
            options: {
              minimize: true,
            },
          },
          {
            loader: 'url-loader',
            options: {
              name: '[sha512:hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: lint.html,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
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
