import React, { useState, useReducer, useContext, useEffect } from 'react';

import SearchResults from '../SearchResults/SearchResults';
import SearchContext from '../../store/search-context.js';
import Trending from '../Trending/Trending';

interface SearchResults {
  count: number;
  feeds: any[];
  query: string;
}

const startingData = {
  count: 0,
  feeds: [],
  query: '',
};

const searchReducer = (state: any, action: any) => {
  if (action.type === 'SET_SEARCH_RESULTS') {
    return {
      ...state,
      count: action.payload.count,
      feeds: action.payload.feeds,
    };
  }
  return { count: 0, feeds: [] };
};

const SearchView = ({ siteConfig }: any) => {
  const ctx = useContext(SearchContext);
  const [searchField, setSearchField] = useState('');
  const [searchResults, setSearchResults] =
    useState<SearchResults>(startingData);

  const [searchResultsState, dispatchSearchResults] = useReducer(
    searchReducer,
    {
      count: 0,
      feeds: [],
      query: '',
    }
  );

  const handleSearch = async () => {
    if (searchField === '') {
      return;
    }

    const query = encodeURI(searchField);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/search/${query}`);
    const data = await res.json();

    const results = {
      count: data.count,
      feeds: data.feeds,
      query: data.query,
    };

    setSearchResults(results);
    dispatchSearchResults({
      type: 'SET_SEARCH_RESULTS',
      payload: results,
    });
  };

  const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  return (
    <SearchContext.Provider
      value={{
        count: 0,
        feeds: [],
        query: '',
      }}
    >
      <div className="flex justify-center flex-col p-4 mx-auto xl:w-[40%]">
        <div className="w-full flex">
          <input
            placeholder="Search podcasts"
            className="rounded-l-md border border-blue-500 pl-4 text-black py-1 outline-0 focus:border-indigo-500 basis-full"
            onChange={handleSearchFieldChange}
            onKeyUp={handleEnterPressed}
          />
          <button
            className="border border-blue-500 bg-blue-500 rounded-r-md p-1 text-white outline-0"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <SearchResults searchResults={searchResultsState} config={siteConfig} />
        {searchResultsState.count === 0 && <Trending />}
      </div>
    </SearchContext.Provider>
  );
};

export default SearchView;
