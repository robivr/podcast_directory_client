import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Trending.module.css';
import SearchContext from '../../store/search-context';

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ctx = useContext(SearchContext);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/trending`);
      const data = await res.json();
      setTrendingData(data.feeds);
      setLoading(false);

      return data;
    };

    getData();

    ctx.clearInput();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-20">
        <h3 className="text-xl font-semibold">Loading podcasts</h3>
        <p>
          Loading podcasts. This is a demo app and the server is hosted on a
          free tier so it might take a few seconds to wake up.
        </p>
        <div className={styles.rings + ' w-32 h-32 test'}></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-2xl lg:text-3xl my-2">Trending</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {trendingData.map((feed: any) => (
          <Link to={`/podcast/${feed.id}`} key={feed.id}>
            <div className="p-4 rounded-xl bg-gray-500 h-full">
              <img
                className="rounded-xl"
                src={feed.artwork}
                alt={feed.title + ' artwork'}
              />
              <p className="text-white mt-2">{feed.title}</p>
              <p className="text-white">{feed.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trending;
