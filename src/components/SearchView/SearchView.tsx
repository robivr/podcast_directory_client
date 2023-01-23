import Trending from '../Trending/Trending';
import SearchInput from '../SearchInput/SearchInput';

const SearchView = () => {
  return (
    <div className="flex justify-center flex-col p-4 mx-auto xl:w-[40%]">
      <SearchInput />
      <Trending />
    </div>
  );
};

export default SearchView;
