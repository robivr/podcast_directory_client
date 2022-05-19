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

  // console.log('CONTEXT:', ctx);

  const handleClick = async (e: any) => {
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

  const handleSearchFieldChange = (e: any) => {
    setSearchField(e.target.value);
  };

  return (
    <SearchContext.Provider
      value={{
        count: 0,
        feeds: [],
      }}
    >
      <button onClick={handleClick}>Search</button>
      <br />
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearchFieldChange}
      />
      <div>
        Feeds: {searchResultsState.count}
        <SearchResults searchResults={searchResultsState} config={siteConfig} />
      </div>
    </SearchContext.Provider>
  );
};

export default SearchView;
