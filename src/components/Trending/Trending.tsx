import { useEffect, useState } from 'react';

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/trending`);
      const data = await res.json();
      console.log(data);
      setTrendingData(data.feeds);

      return data;
    };

    getData();
  }, []);

  return (
    <div>
      <h2 className="font-bold">Trending</h2>
      <div>
        {trendingData.map((feed: any) => (
          <div
            className="border bg-slate-500 lg:w-1/4 p-4 rounded-xl inline-block m-2"
            key={feed.id}
          >
            <img
              className="rounded-xl"
              src={feed.artwork}
              alt={feed.title + ' artwork'}
            />
            <p className="text-white">{feed.title}</p>
            <p className="text-white">{feed.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
