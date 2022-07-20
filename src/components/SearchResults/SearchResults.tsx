import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../Pagination/Pagination';
import ResultItem from './ResultItem';
import styles from './SearchResults.module.css';

const SearchResults = (props: any) => {
  const [page, setPage] = useState(1);

  const perPage = props.config.perPage;

  if (props.searchResults.count === 0) return null;

  const handlePageChange = (currPage: number) => {
    setPage(currPage);
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
      <Pagination
        page={page}
        resultCount={props.searchResults.count}
        perPage={perPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchResults;
