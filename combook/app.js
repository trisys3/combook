import React from 'react';

import css from './app.css';

import {bookPage} from './app.css';
const Page = window.page.default;

export default class Book extends React.Component {
  render() {
    let {startPage = 0, endPage} = this.props || {};

    if(startPage < this.firstPage) {
      startPage = this.firstPage;
    }
    if(endPage > this.lastPage) {
      endPage = this.lastPage;
    }

    if(endPage < startPage) {
      endPage = startPage;
    }

    const pageCount = Math.abs(endPage - startPage + 1) || 1;

    return <bookComp className={this.bookCss.comBook}>
      {[,...Array(pageCount)].map((page, pageNum) => {
        let pageWords = '';
        try {
          pageWords = require(`${this.bookFolder}/pages/${pageNum}/words.txt`);
        } catch(error) {}

        return <page className={bookPage} key={pageNum}>
          <Page words={pageWords}>
            <page-num>{pageNum + startPage - 1}</page-num>
          </Page>
        </page>;
      })}
    </bookComp>;
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
