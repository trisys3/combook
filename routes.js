import {join} from 'path';
import webpack from 'webpack';
import IndexHtml from 'html-webpack-plugin';
import {watch} from 'chokidar';
import Koa from 'koa';
import mount from 'koa-mount';
import serve from 'koa-static';
import {green} from 'chalk';

import options from './config';
import bundler from './webpack.client.config';
import {socket} from './server';

const root = {
  path: 'home',
  name: 'home',
};

const book = {
  path: 'combook',
  src: 'book',
  name: 'comBook',
};

const page = {
  path: 'page',
  src: 'page',
  name: 'page',
};

const routes = [
  root,
  book,
  page,
];

export default routes.map(({name = '', path = '', src = '', route}) => {
  const app = new Koa();
  const cwd = join(process.cwd(), path);

  bundler.entry.app = join(cwd, 'app.js');
  Object.assign(bundler.output, {
    path: join(cwd, options.nodeEnv),
    library: name,
  });
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
      // sockets already connected to this page
      hotUpdWatch.on('add', () => {
        console.log(green('File changed'));
        io.emit('hot-update');
      });
    });
  });

  if(typeof route === 'function') {
    app.use(route());
  }

  app.use(serve(join(path, options.nodeEnv)));

  return mount(`/${src}`, app);
});
