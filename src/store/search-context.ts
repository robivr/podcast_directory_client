import React from 'react';

interface SearchContextInterface {
  count: number;
  feeds: any[];
}

const SearchContext = React.createContext<SearchContextInterface>({
  count: 0,
  feeds: [],
});

export default SearchContext;
