// connect to the home SocketIO namespace
import io from 'socket.io-client';
const socket = io(__dirname);

import React from 'react';
import ReactDOM from 'react-dom';

// import {MdParser} from './md-parser';
import './app.styl';

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

// ReactDOM.render(<MdParser />, document.querySelector('notes-parser'));
