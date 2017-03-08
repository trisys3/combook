import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import {homeBook} from './app.css';

const socket = io(__dirname);

const book = {
  author: {
    full: 'S. O. Meone',
    first: 's',
    last: 'meone',
  },
  title: 'The Home-Bound Hero',
  shortTitle: 'home-bound-hero',
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

const Book = window.comBook.default;

ReactDOM.render(
  <div className={homeBook}>
    <Book book={book} />
  </div>,

  document.querySelector('com-book'),
);

if(module.hot) {
  module.hot.accept();
  socket.once('hot-update', () => module.hot.check(true));
}
