import React from 'react';

import css from './app.css';

const Page = window.page.default;

export default function Book({book: {shortTitle = '', author = ''} = {}, startPage = 0, endPage} = {}) {
  const authorName = `${author.first}-${author.last}`;
  const bookFolder = `./books/${authorName}/${shortTitle}`;
  const bookCss = require(`${bookFolder}/book.css`);

  const pageCount = Math.abs(endPage - startPage + 1) || 1;

  return <div className={`${css.comBook} ${bookCss.comBook}`}>
    {Array(pageCount).map((page, index) => {
      const pageNum = index + 1;
      const pageWords = require(`${bookFolder}/pages/${pageNum}/words.txt`);

      return <Page words={pageWords} key={pageNum} />;
    })}
  </div>;
}
