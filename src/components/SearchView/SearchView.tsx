import React, { useState, useReducer, useContext } from 'react';

import SearchResults from '../SearchResults/SearchResults';
import SearchContext from '../../store/search-context.js';

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
    }
  );

  console.log('searchResults', searchResults);

  const handleSearch = async () => {
    if (searchField === '') {
      return;
    }

    const query = encodeURI(searchField);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/search/${query}`);
    const data = await res.json();

    console.log(data);

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
      }}
    >
      <div className="flex justify-center flex-col p-4 mx-auto">
        <input
          type="text"
          placeholder="Search podcasts"
          onChange={handleSearchFieldChange}
          onKeyUp={handleEnterPressed}
          className="block w-full rounded-md border-blue-500 border shadow-sm text-center focus:ring-0 focus:border-red-500 focus:border"
        />
        <br />
        <button
          onClick={handleSearch}
          className="w-full font-medium bg-sky-400 border-solid border border-indigo-500 rounded-md text-white"
        >
          Search
        </button>
        <SearchResults searchResults={searchResultsState} config={siteConfig} />
      </div>
    </SearchContext.Provider>
  );
};

export default SearchView;
