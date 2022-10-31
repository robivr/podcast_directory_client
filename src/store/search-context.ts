import React from 'react';

interface SearchContextInterface {
  count: number;
  feeds: any[];
  query: string;
}

const SearchContext = React.createContext<SearchContextInterface>({
  count: 0,
  feeds: [],
  query: '',
});

export default SearchContext;
