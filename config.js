'use strict';

let yargs = require('yargs');
const stripJsonComments = require('strip-json-comments');
const readFileSync = require('fs').readFileSync;

// global argument configuration
yargs = yargs
  .env()
  .options({
    config: {
      config: true,
      configParser: configPath => {
        try {
          return JSON.parse(stripJsonComments(readFileSync(configPath, 'utf8')));
        } catch(e) {
          // the file probably just does not exist, which is perfectly fine
          // for us, so we'll just use an empty object
          return {};
        }
      },
      description: 'Path to a file with all default configuration options. Defaults to ".combookrc", in the style of common Linux & node utilities\' configuration file paths. Comments are stripped out.',
      default: '.combookrc',
    },
  });

// global argument options, that depend on nothing but the global argument
// configuration but that other arguments may depend on
yargs = yargs
  .options({
    nodeEnv: {
      type: 'string',
      description: 'Server\'s phase of development',
      default: 'development',
    },
  });

// 1st-level arguments, that rely on nothing but maybe global constants
yargs = yargs
  .options({
    name: {
      type: 'string',
      description: 'Name of the server',
      default: 'ComBook',
    },
    hostname: {
      type: 'string',
      description: 'Hostname the server uses.',
      default: 'combook.com',
    },
    basePort: {
      type: 'number',
      alias: 'bp',
      description: 'Base port for the web server, defaulting to the NodeJS default of 3000.',
      default: 3000,
    },
    offsetPort: {
      type: 'number',
      alias: 'op',
      description: 'Offset port for the webserver. Defaults to having no offset, meaning the server just uses the base port.',
      default: 0,
    },
    clientOffsetPort: {
      type: 'number',
      alias: 'cop',
      description: 'Offset port for the port the test client is using to connect from the Vagrant or Docker virtual machine to the server, defaulting to no offset.',
      default: 0,
    },
    quiet: {
      type: 'boolean',
      alias: 'q',
      description: 'Suppress output. If \'verbose\' is set, lowers it by 1.',
      default: 'false',
    },
    verbose: {
      type: 'number',
      alias: 'v',
      description: 'Show more output. If \'quiet\' is set, this is lowered by 1.',
      default: 0,
    },
  });

// 2nd-level configuration, that depends on the 1st-level configuration
yargs = yargs
  .options({
    port: {
      type: 'number',
      alias: 'p',
      description: 'Set the port explicitly, rather than adding the main & offset ports.',
      default: yargs.argv.basePort + yargs.argv.offsetPort,
    },
    clientBasePort: {
      type: 'number',
      alias: 'cbp',
      description: `Base port for the port the test client is using to connect from the Vagrant or Docker virtual machine to the server, defaulting to the server port.
        NOTE: In the future, this will be gotten from the API of VirtualBox, Docker, or whatever virtual machine system is specified, so it will not usually need to be set explicitly.`,
      default: yargs.argv.basePort,
    },
  });

// 3rd-level argument configuration & above
yargs = yargs
  .options({
    clientPort: {
      type: 'number',
      alias: 'cp',
      description: 'Set the port explicitly, rather than adding the main & offset ports.',
      default: yargs.argv.clientBasePort + yargs.argv.clientOffsetPort,
    },
  });

module.exports = yargs.argv;
