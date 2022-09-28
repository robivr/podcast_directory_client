import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Podcast {
  id: number;
  title: string;
  artwork: string;
  description: string;
  author: string;
  episodeCount: number;
  explicit: boolean;
  link: string;
}

interface Episode {
  id: number;
  title: string;
  description: string;
  duration: number;
  explicit: number;
  datePublished: Number;
  datePublishedPretty: string;
  enclosureType: string;
  enclosureUrl: string;
}

const PodcastView = () => {
  let params = useParams();

  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/podcast/${params.id}`
      );
      const data = await res.json();

      setPodcast(data.feed);
    };

    fetchPodcast();

    const fetchEpisodes = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/episodes/${params.id}`
      );
      const data = await res.json();

      setEpisodes(data.items);
    };

    fetchEpisodes();
  }, []);

  if (podcast === null || episodes === null) {
    return <p>Loading podcast ...</p>;
  }

  return (
    <main className="p-4 lg:flex lg:flex-col lg:items-center">
      <section className="mb-4">
        <h2 className="text-xl font-bold">{podcast.title}</h2>
      </section>
      <section className="info-row flex">
        <div className="info-row-left">
          <img
            src={podcast.artwork}
            alt={podcast.title + ' podcast artwork'}
            className="w-64 rounded-lg"
          />
        </div>
        <div className="info-row-right px-4">
          <p>Hosted by: {podcast.author}</p>
        </div>
      </section>
      <section className="description p-4 leading-5">
        {podcast.description}
      </section>
      <section className="player flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-1">
          Listen to the last episode
        </h3>
        <p className="mb-1">{episodes[0].title}</p>
        <audio controls>
          <source
            src={episodes[0].enclosureUrl}
            type={episodes[0].enclosureType}
          />
          Your browser does not support the audio element.
        </audio>
      </section>
    </main>
  );
};

export default PodcastView;
