import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import SearchView from './components/SearchView/SearchView';
import PodcastView from './components/PodcastView/PodcastView';
import SearchResults from './components/SearchResults/SearchResults';
import { SearchContextProvider } from './store/search-context';

const siteConfig = {
  title: 'Podcast Directory',
  perPage: 5,
};

function App() {
  return (
    <SearchContextProvider>
      <div className="App">
        <BrowserRouter>
          <div className="flex items-center justify-center my-4">
            <Link to="/">
              <img src="/podcast_directory_logo.png" className="w-72" />
            </Link>
          </div>
          <Routes>
            <Route path="/" element={<SearchView />} />
            <Route path="/podcast" element={<PodcastView />}>
              <Route path=":id" element={<PodcastView />} />
            </Route>
            <Route
              path="/search"
              element={<SearchResults config={siteConfig} />}
            >
              <Route path=":query" element={<SearchResults />} />
            </Route>
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </SearchContextProvider>
  );
}

export default App;
