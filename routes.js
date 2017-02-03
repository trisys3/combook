import {join} from 'path';
import {readFileSync} from 'fs';
import webpack from 'webpack';
import IndexHtml from 'html-webpack-plugin';
import {watch} from 'chokidar';
import mime from 'mime';

import options from './config';
import bundler from './webpack.client.config';
import home from './home';
import {socket} from './server';
import {green} from 'chalk';

const root = {
  route: home(),
  path: 'home',
};

const routes = [root];

export default routes.map(({route, path}) => {
  const cwd = join(process.cwd(), path);

  bundler.entry.app = join(cwd, 'app.js');
  bundler.output.path = join(cwd, options.nodeEnv);
  bundler.plugins[1] = new IndexHtml({
    template: join(cwd, 'index.html'),
  });

  // compile the module with webpack
  webpack(bundler, () => {
    // watch all hot update files in the compilation folder
    const hotUpdWatch = watch('*.hot-update.json', {
      cwd: join(cwd, options.nodeEnv),
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

  return (ctx, next) => {
    // we only deal with GET requests here
    if(ctx.method !== 'GET') {
      return next();
    }

    const path = ctx.path;
    if(path === '/' || path === '/index.html') {
      Object.assign(ctx, {
        type: 'html',
        body: readFileSync(join(cwd, options.nodeEnv, 'index.html'), 'utf-8'),
      });
    } else {
      Object.assign(ctx, {
        type: mime.lookup(path),
        body: readFileSync(join(cwd, options.nodeEnv, path), 'utf-8'),
      });
    }

    if(typeof route === 'function') {
      route(ctx);
    }

    return next();
  };
});
