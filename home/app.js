// connect to the home SocketIO namespace
import io from 'socket.io-client';

import './app.css';

const socket = io(__dirname);

if(module.hot) {
  module.hot.accept();
  socket.once('hot-update', () => module.hot.check(true));
}
