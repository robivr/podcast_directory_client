import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Pagination from '../Pagination/Pagination';
import ResultItem from './ResultItem';
import styles from './SearchResults.module.css';
import SearchInput from '../SearchInput/SearchInput';

const SearchResults = (props: any) => {
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState({
    count: 0,
    feeds: [],
    query: '',
  });
  const params = useParams();

  useEffect(() => {
    const fetchSearch = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/search/${params.query}`
      );
      const data = await res.json();

      setSearchResults({
        count: data.count,
        feeds: data.feeds,
        query: data.query,
      });
    };

    fetchSearch();
  }, [params.query]);

  const perPage = props.config.perPage;

  if (searchResults.count === 0) return null;

  const handlePageChange = (currPage: number) => {
    setPage(currPage);
  };

  return (
    <div className="flex justify-center flex-col p-4 mx-auto xl:w-[40%]">
      <div className="mb-4">
        <SearchInput />
      </div>
      <Pagination
        page={page}
        resultCount={searchResults.count}
        perPage={perPage}
        handlePageChange={handlePageChange}
      />
      <ul className="my-4">
        {searchResults['feeds']
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
        resultCount={searchResults.count}
        perPage={perPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchResults;
