import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import './app.css';

const socket = io(__dirname);

const ComicBook = window.comBook.default;
const Page = window.page.default;
const Panel = window.panel.default;

ReactDOM.render(
  <ComicBook>
    <Page>
      <Panel />
    </Page>
  </ComicBook>,
  document.querySelector('com-book'),
);

if(module.hot) {
  module.hot.accept();
  socket.once('hot-update', () => module.hot.check(true));
}
