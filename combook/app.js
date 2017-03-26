import React from 'react';

import css from './app.css';

const Page = window.page.default;

export default class Book extends React.Component {
  render() {
    const {book: {shortTitle = '', author = ''} = {}, startPage = 0,
      endPage} = this.props || {};

    const authorName = `${author.first}-${author.last}`;
    const bookFolder = `./books/${authorName}/${shortTitle}`;
    const bookCss = require(`${bookFolder}/book.css`);
    const {pages, firstPage = 1, lastPage = pages + firstPage - 1} =
      require(`${bookFolder}/meta`);

    Object.assign(this, {firstPage, lastPage});

    const pageCount = Math.abs(endPage - startPage + 1) || 1;

    return <div className={`${css.comBook} ${bookCss.comBook}`}>
      {Array(pageCount).map((page, index) => {
        const pageNum = index + 1;
        const pageWords = require(`${bookFolder}/pages/${pageNum}/words.txt`);

        return <Page words={pageWords} key={pageNum} />;
      })}
    </div>;
  }

  componentDidMount() {
    this.props.isFirstPage(this.props.startPage <= this.firstPage);
    this.props.isLastPage(this.props.endPage >= this.lastPage);
  }

  componentDidUpdate({startPage, endPage}) {
    if(startPage !== this.props.startPage ||
        endPage !== this.props.endPage) {
      this.props.isFirstPage(this.props.startPage <= this.firstPage);
      this.props.isLastPage(this.props.endPage >= this.lastPage);
    }
  }
}
