'use strict';

// third-party components
import {green, gray, magenta, cyan, red} from 'chalk';
import Koa from 'koa';
import logger from 'koa-logger';
import compress from 'koa-compress';
import helmet from 'koa-helmet';
import {createServer} from 'http';

// first-party components
import {socket, options} from './config';
import bundler from './webpack.client.config';

// our main koa & SocketIO servers
export const server = new Koa();

// get the routes
import routes from './routes';
const allRoutes = routes(options, bundler);

// give the server a name
server.name = options.name;

// set the phase of development for the app
server.env = options.env;

// compression middleware
server.use(compress());

// our JSONAPI logger
server.use(logger({
  name: options.name,
  path: 'logs/com-logger',
}));

// add certain headers for protection
server.use(helmet());
// server.use(convert(helmet.csp(csp)));

server.use(allRoutes);

// create a NodeJS server with the content of our koa application
const app = createServer(server.callback());

export {serve, stop};

if(process.argv[1] === __filename) {
  // if we are the called file, start the server
  serve();
}

function serve() {
  // log some general information about the application
  console.log(green(`Application ${cyan(options.name)}, port ${gray(options.port)} started at ${red(new Date())}`));
  console.log(green(`Environment: ${magenta(options.env)}`));
  console.log(green(`Hostname(s): ${cyan(options.hostname)}`));

  // have all server components listen
  app.listen(options.port);
  socket.listen(app);
}

function stop() {
  console.log(green(`Application ${cyan(options.name)}, port ${gray(options.port)} stopped at ${red(new Date())}`));

  app.close();
  socket.close();
}
