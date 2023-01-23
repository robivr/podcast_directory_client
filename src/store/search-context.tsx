import React, { useState } from 'react';

interface SearchContextInterface {
  input: string;
  handleInputChange: any;
  clearInput: any;
}

const SearchContext = React.createContext<SearchContextInterface>({
  input: '',
  handleInputChange: () => {},
  clearInput: () => {},
});

export const SearchContextProvider = (props: any) => {
  const [input, setInput] = useState('');

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <SearchContext.Provider
      value={{
        input,
        handleInputChange: handleSearchFieldChange,
        clearInput,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
