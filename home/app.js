// connect to the home SocketIO namespace
import io from 'socket.io-client';
const socket = io(__dirname);

import './app.css';

if(module.hot) {
  module.hot.accept();
  socket.on('hot-update', () => {
    module.hot.check((err, mods) => {
      if(mods) {
        module.hot.apply();
      }
    });
  });
}
