import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import './app.css';

const socket = io(__dirname);

const book = {
  author: 'S. O. Meone',
  title: 'The Home-Bound Hero',
  pages: [
    {
      start: 1,
      end: 2,
    },
    {
      start: -2,
      end: -1,
    },
  ],
};

const ComicBook = window.comBook.default;

ReactDOM.render(
  <ComicBook book={book} />,
  document.querySelector('com-book'),
);

if(module.hot) {
  module.hot.accept();
  socket.once('hot-update', () => module.hot.check(true));
}
