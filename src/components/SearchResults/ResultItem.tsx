import React from 'react';

import CategoryList from './CategoryList';

const ResultItem = ({ feed }: any) => {
  return (
    <div className="result-item border-solid border-2 flex flex-col rounded-md my-1">
      <div className="result-row flex">
        <div className="result-item-art p-4">
          <img
            src={feed.artwork}
            alt={feed.title + ' podcast artwork'}
            className="content-between w-32 rounded-lg"
          />
        </div>
        <div className="text-sm flex flex-col items-center justify-center w-full">
          <h3 className="mt-4 font-bold text-base">{feed.title}</h3>
          <p>by {feed.author}</p>
          {feed.categories !== null && (
            <CategoryList categories={feed.categories} />
          )}
        </div>
      </div>
      <div className="result-row flex p-4 text-sm">{feed.description}</div>
    </div>
  );
};

export default ResultItem;
