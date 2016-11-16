'use strict';

import IndexHtml from 'html-webpack-plugin';
import webpack from 'webpack';
import {watch} from 'chokidar';
import {resolve} from 'path';
import {readFileSync} from 'fs';
import mime from 'mime';
import bundler from '../webpack.client.config';
import {socket, options, minify} from '../config';
import {green} from 'chalk';

export default homePage;

function homePage() {
  bundler.entry.app = `${process.cwd()}/${__dirname}/app.js`;
  bundler.output.path = `${process.cwd()}/home/${options.env}`;
  bundler.plugins[1] = new IndexHtml({
    template: `${__dirname}/index.html`,
    inject: true,
    minify: minify.html,
  });

  // compile the module with webpack
  webpack(bundler, () => {
    // watch all hot update files in the compilation folder
    const hotUpdWatch = watch('*.hot-update.json', {
      cwd: `${process.cwd()}/${__dirname}/${options.env}`,
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
      await next();
    }

    const path = resolve(ctx.path);
    if(path === '/' || path === '/index.html') {
      ctx.type = 'html';
      ctx.body = readFileSync(`${__dirname}/${options.env}/index.html`, 'utf-8');
    } else {
      ctx.type = mime.lookup(path);
      ctx.body = readFileSync(`${__dirname}/${options.env}/${path}`, 'utf-8');
    }

    await next();
  };
}
