import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/trending`);
      const data = await res.json();
      console.log(data);
      setTrendingData(data.feeds);
      setLoading(false);

      return data;
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-20">
        <h3 className="text-xl font-semibold">Loading podcasts</h3>
        <p>
          Loading podcasts. This is a demo app and the server is hosted on a
          free tier so it might take a few seconds to wake up.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-2xl lg:text-3xl my-2">Trending</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {trendingData.map((feed: any) => (
          <Link to={`/podcast/${feed.id}`} key={feed.id}>
            <div className="border p-4 rounded-xl bg-gray-600 h-full">
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
