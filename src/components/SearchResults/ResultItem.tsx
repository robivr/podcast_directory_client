import React from 'react';

import CategoryList from './CategoryList';
import styles from './ResultItem.module.css';

const ResultItem = ({ feed }: any) => {
  // console.log(feed.categories);
  return (
    <div className={styles.result_item_container + 'border-solid border-2'}>
      <div className={styles.artwork}>
        <img
          src={feed.artwork}
          alt={feed.title + ' podcast artwork'}
          className={styles.artwork_image}
        />
      </div>
      <div className={styles.podcast_info}>
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
