import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import SearchView from './components/SearchView/SearchView';
import PodcastView from './components/PodcastView/PodcastView';

const siteConfig = {
  title: 'Podcast Directory',
  perPage: 5,
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">
          <div className="flex items-center justify-center">
            <img src="/podcast_directory_logo.png" />
          </div>
        </Link>
        <Routes>
          <Route path="/" element={<SearchView siteConfig={siteConfig} />} />
          <Route path="/podcast" element={<PodcastView />}>
            <Route path=":id" element={<PodcastView />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
