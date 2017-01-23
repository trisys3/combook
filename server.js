'use strict';

// third-party components
import {green, gray, magenta, cyan, red} from 'chalk';
import Koa from 'koa';
import logger from 'koa-logger';
import compress from 'koa-compress';
import helmet, {contentSecurityPolicy as csp} from 'koa-helmet';
import {createServer} from 'http';
import Sockets from 'socket.io';

// first-party components
import options from './config';
import bundler from './webpack.client.config';

const socket = new Sockets();

// Content-Security-Policy configuration
const cspConf = {
  directives: {
    // by default only allow connections from our sites
    'default-src': ["'self'"],
    // only allow JavaScript code from our sites
    'script-src': ["'self'"],
    // only allow CSS styles from our sites
    'style-src': ["'self'", 'blob:'],
    // only allow images from our sites and data-uri's
    'img-src': ["'self'", 'data:'],
    // only allow partial-page connections (XHR, WebSockets, etc.) from our
    // sites
    'connect-src': ["'self'", `ws://localhost:${options.clientPort}`],
    // only allow fonts from our sites
    'font-src': ["'self'"],
    // do not allow Flash on our sites
    'object-src': ["'none'"],
    // do not allow embedding of <iframe>s in our sites
    'frame-src': ["'none'"],
    // only allow video & audio from our sites
    'media-src': ["'self'"],
    // URL to send reports of violations to
    'report-uri': '/csp-report',
  },
};

// our main koa & SocketIO servers
export const server = new Koa();

// get the routes
import routes from './routes';
const allRoutes = routes(options, bundler);

// give the server a name
server.name = options.name;

// set the phase of development for the app
server.env = options.nodeEnv;

server.use(({request: req, path, method, response: res}, next) => {
  if(method !== 'POST' || path !== '/csp-report') {
    return next();
  }

  const viol = req.body || 'No data received!';
  console.log(`CSP Violation: ${viol}`);

  res.status = 204;
});

// compression middleware
server.use(compress());

// our JSONAPI logger
server.use(logger({
  name: options.name,
  path: 'logs/com-logger',
}));

// add certain headers for protection
server.use(helmet());
server.use(csp(cspConf));

server.use(allRoutes);

// create a NodeJS server with the content of our koa application
const app = createServer(server.callback());

export {serve, stop, socket};

if(process.argv[1] === __filename) {
  // if we are the called file, start the server
  serve();
}

function serve() {
  // log some general information about the application
  console.log(green(`Application ${cyan(options.name)}, port ${gray(options.port)} started at ${red(new Date())}`));
  console.log(green(`Environment: ${magenta(options.nodeEnv)}`));
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
