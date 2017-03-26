import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import {homeComp, homeBook, pageChanger, prevPage, nextPage} from './app.css';
const Book = window.comBook.default;

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

if(module.hot) {
  module.hot.accept();
  socket.once('hot-update', () => module.hot.check(true));
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      startPage: 1,
    };
  }

  render() {
    const {startPage, endPage = startPage} = this.state;
    return <div className={homeComp}>
      <div className={`${prevPage} ${pageChanger}`} onClick={() => this.getPrevPage()} />

      <div className={homeBook}>
        <Book book={book} startPage={startPage} endPage={endPage} />
      </div>

      <div className={`${nextPage} ${pageChanger}`} onClick={() => this.getNextPage()} />
    </div>;
  }

  getPrevPage() {
  }

  getNextPage() {
    console.log(this.setState);
  }
}

ReactDOM.render(<Home />, document.querySelector('home-book'));
