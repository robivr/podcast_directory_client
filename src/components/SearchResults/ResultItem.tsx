import React from 'react';

import CategoryList from './CategoryList';

const ResultItem = ({ feed }: any) => {
  return (
    <div className="border-solid border-2 flex">
      <div className="w-1/2">
        <img
          src={feed.artwork}
          alt={feed.title + ' podcast artwork'}
          className="w-full content-between"
        />
      </div>
      <div className="w-1/2 text-sm">
        <h3>{feed.title}</h3>
        <p>by {feed.author}</p>
        {feed.categories !== null && (
          <CategoryList categories={feed.categories} />
        )}
      </div>
    </div>
  );
};

export default ResultItem;
