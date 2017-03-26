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
      endPage: 1,
    };

    this.isFirstPage = this.isFirstPage.bind(this);
    this.isLastPage = this.isLastPage.bind(this);
  }

  render() {
    const {startPage, endPage = startPage} = this.state;
    return <div className={homeComp}>
      <div className={`${prevPage} ${pageChanger}`} onClick={() => this.getPrevPage()} disabled={this.state.isFirstPage} />

      <div className={homeBook}>
        <Book book={book} startPage={startPage} endPage={endPage} isFirstPage={this.isFirstPage} isLastPage={this.isLastPage} />
      </div>

      <div className={`${nextPage} ${pageChanger}`} onClick={() => this.getNextPage()} disabled={this.state.isLastPage} />
    </div>;
  }

  isFirstPage(isFirst) {
    this.setState({isFirstPage: isFirst});
  }

  isLastPage(isLast) {
    this.setState({isLastPage: isLast});
  }

  getPrevPage() {
    if(this.state.isFirstPage) {
      return;
    }

    const newEnd = this.state.startPage - 1;
    const newStart = newEnd - 1;
    this.setState({startPage: newStart, endPage: newEnd});
  }

  getNextPage() {
    if(this.state.isLastPage) {
      return;
    }

    const newStart = this.state.endPage + 1;
    const newEnd = newStart + 1;
    this.setState({startPage: newStart, endPage: newEnd});
  }
}

ReactDOM.render(<Home />, document.querySelector('home-book'));
