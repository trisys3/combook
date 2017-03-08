import React from 'react';

import css from './app.css';

const Page = window.page.default;

export default ({book: {shortTitle, author}, pages = 1}) => {
  const authorName = `${author.first}-${author.last}`;
  const bookFolder = `./books/${authorName}/${shortTitle}`;
  const bookCss = require(`${bookFolder}/book.css`);

  if(!Array.isArray(pages)) {
    pages = [pages];
  }

  return <div className={`${css.comBook} ${bookCss.comBook}`}>
    {pages.map((page, index) => {
      const pageWords = require(`${bookFolder}/pages/${page}/words.txt`);
      console.log(pageWords);
      return <Page words={pageWords} key={index} />;
    })}
  </div>;
};
