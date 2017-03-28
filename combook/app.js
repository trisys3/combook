import React from 'react';

import css from './app.css';

const Page = window.page.default;

export default class Book extends React.Component {
  render() {
    const {startPage = 0, endPage} = this.props || {};

    const pageCount = Math.abs(endPage - startPage + 1) || 1;

    return <div className={`${css.comBook} ${this.bookCss.comBook}`}>
      {Array(pageCount).map((page, index) => {
        const pageNum = index + 1;
        const pageWords = require(`${this.bookFolder}/pages/${pageNum}/words.txt`);

        return <Page words={pageWords} key={pageNum} />;
      })}
    </div>;
  }

  componentWillMount() {
    Object.assign(this, this.getMeta(this.props.book));
    this.props.isBookend({
      isFirst: this.props.startPage <= this.firstPage,
      isLast: this.props.endPage >= this.lastPage,
    });
  }

  componentWillReceiveProps({book, startPage, endPage}) {
    if(book !== this.props.book) {
      Object.assign(this, this.getMeta(this.props.book));
    }

    if(startPage !== this.props.startPage ||
        endPage !== this.props.endPage) {
      this.props.isBookend({
        isFirst: startPage <= this.firstPage,
        isLast: endPage >= this.lastPage,
      });
    }
  }

  getMeta(book) {
    const {shortTitle = '', author = ''} = book || {};
    this.authorName = `${author.first}-${author.last}`;
    this.bookFolder = `./books/${this.authorName}/${shortTitle}`;
    const {pages, firstPage = 1, lastPage = pages + firstPage - 1} =
      require(`${this.bookFolder}/meta`);

    return {
      bookCss: require(`${this.bookFolder}/book.css`),
      pages,
      firstPage,
      lastPage,
    };
  }
}
