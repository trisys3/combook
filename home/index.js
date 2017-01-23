'use strict';

import IndexHtml from 'html-webpack-plugin';
import webpack from 'webpack';
import {watch} from 'chokidar';
import {resolve} from 'path';
import {readFileSync} from 'fs';
import mime from 'mime';
import {green} from 'chalk';

import options from '../config';
import {socket} from '../server';
import bundler, {minify} from '../webpack.client.config';

export default homePage;

function homePage() {
  bundler.entry.app = `${process.cwd()}/${__dirname}/app.js`;
  bundler.output.path = `${process.cwd()}/home/${options.nodeEnv}`;
  bundler.plugins[1] = new IndexHtml({
    template: `${__dirname}/index.html`,
    inject: true,
    minify: minify.html,
  });

  // compile the module with webpack
  webpack(bundler, () => {
    // watch all hot update files in the compilation folder
    const hotUpdWatch = watch('*.hot-update.json', {
      cwd: `${process.cwd()}/${__dirname}/${options.nodeEnv}`,
      // ignore hidden files
      ignored: /^\./,
    });

    socket.on('connection', io => {
      // whenever a hot-update file gets created, emit a hot-update event to all
      // sockets connected to this page
      hotUpdWatch.on('add', () => {
        console.log(green('File changed'));
        io.emit('hot-update');
      });
    });
  });

  return async (ctx, next) => {
    // we only deal with GET requests here
    if(ctx.method !== 'GET') {
      return next();
    }

    const path = resolve(ctx.path);
    console.log(ctx.path);
    if(path === '/' || path === '/index.html') {
      Object.assign(ctx, {
        type: 'html',
        body: readFileSync(`${__dirname}/${options.nodeEnv}/index.html`, 'utf-8'),
      });
    } else {
      Object.assign(ctx, {
        type: mime.lookup(path),
        body: readFileSync(`${__dirname}/${options.nodeEnv}/${path}`, 'utf-8'),
      });
    }

    return next();
  };
}
