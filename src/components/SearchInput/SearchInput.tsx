import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchContext from '../../store/search-context';

const SearchInput = () => {
  const ctx = useContext(SearchContext);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (ctx.input === '') {
      return;
    }

    const query = encodeURI(ctx.input);

    navigate(`/search/${query}`);
  };

  const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex">
      <input
        placeholder="Search podcasts"
        className="rounded-l-md border border-blue-500 pl-4 text-black py-1 outline-0 focus:border-indigo-500 basis-full"
        onChange={ctx.handleInputChange}
        onKeyUp={handleEnterPressed}
        value={ctx.input}
      />
      <button
        className="border border-blue-500 bg-blue-500 rounded-r-md p-1 text-white outline-0"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
