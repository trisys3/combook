// connect to the home SocketIO namespace
import io from 'socket.io-client';

import './app.css';

const socket = io(__dirname);

const {forEach} = Array.prototype;

const bookImp = document.querySelector('#book-import').import;
const bookSpots = document.querySelectorAll('com-book');

if(bookImp != null) {
  const pages = bookImp.querySelector('com-book').children;
  bookSpots::forEach(spot => pages
    ::forEach(page => spot.appendChild(page.cloneNode())));
}

if(module.hot) {
  module.hot.accept();
  socket.once('hot-update', () => module.hot.check(true));
}
