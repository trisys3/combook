// connect to the home SocketIO namespace
import io from 'socket.io-client';
const socket = io(__dirname);

import './app.css';

if(module.hot) {
  module.hot.accept();
  socket.once('hot-update', () => module.hot.check(true));
}
