import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ResultItem from './ResultItem';
import styles from './SearchResults.module.css';

const SearchResults = (props: any) => {
  const [page, setPage] = useState(1);

  const perPage = props.config.perPage;

  // console.log('SearchResults props', props);
  if (props.searchResults.count === 0) return null;

  const handlePrevPage = (e: any) => {
    setPage(page - 1);
  };

  const handleNextPage = (e: any) => {
    setPage(page + 1);
  };

  return (
    <div>
      <span>Page {page}</span>
      <ul className={styles.result_list}>
        {props.searchResults['feeds']
          .slice((page - 1) * perPage, perPage * page)
          .map((feed: any) => (
            <li key={feed.id} className={styles.result_item}>
              <Link to={`/podcast/${feed.id}`}>
                <ResultItem feed={feed} />
              </Link>
            </li>
          ))}
      </ul>
      <button onClick={handlePrevPage} disabled={page <= 1}>
        Prev
      </button>
      <button
        onClick={handleNextPage}
        disabled={page >= Math.ceil(props.searchResults.count / perPage)}
      >
        Next
      </button>
    </div>
  );
};

export default SearchResults;
