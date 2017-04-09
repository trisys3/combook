import React from 'react';

import {page1, pageMiddle, pageLast} from './app.css';

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

    return <book-comp class={this.bookCss.comBook}>
      {[,...Array(pageCount)].map((page, pageNum) => {
        let pageWords = '';
        try {
          pageWords = require(`${this.bookFolder}/pages/${pageNum}/words.txt`);
        } catch(error) {}

        let pageClasses = '';
        if(pageNum === 1 && pageCount > 1) {
          pageClasses += ` ${page1}`;
        } else if(pageNum === pageCount) {
          pageClasses += ` ${pageLast}`;
        } else {
          pageClasses += ` ${pageMiddle}`;
        }

        return <page key={pageNum}>
          <Page words={pageWords}>
            <page-num class={pageClasses}>{pageNum + startPage - 1}</page-num>
          </Page>
        </page>;
      })}
    </book-comp>;
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
