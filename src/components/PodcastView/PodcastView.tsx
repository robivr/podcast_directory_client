import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdPodcasts } from 'react-icons/md';

import CategoryList from '../SearchResults/CategoryList';
import AudioPlayerComponents from '../AudioPlayer/AudioPlayerComponent';

interface Podcast {
  id: number;
  title: string;
  artwork: string;
  description: string;
  author: string;
  episodeCount: number;
  explicit: boolean;
  link: string;
  categories: [string];
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
  image: string;
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
    <main className="p-4 lg:inline-flex lg:flex-col lg:items-center lg:w-1/2">
      <section className="mb-4 lg:mb-8">
        <h2 className="text-xl font-bold lg:text-6xl">{podcast.title}</h2>
      </section>
      <section className="info-row flex lg:items-center lg:justify-center lg:mb-8 w-full">
        <div className="info-row-left">
          <img
            src={podcast.artwork}
            alt={podcast.title + ' podcast artwork'}
            className="w-64 rounded-lg lg:w-40"
          />
        </div>
        <div className="info-row-right px-4 lg:w-[50%]">
          <p className="mb-1 font-semibold lg:text-xl">
            Hosted by: {podcast.author}
          </p>
          <CategoryList categories={podcast.categories} />
        </div>
      </section>
      <section className="description p-4 leading-5 text-lg">
        {podcast.description}
        <span className="block mt-2">
          <a href={podcast.link} className="font-semibold hover:underline">
            <span>
              <MdPodcasts className="inline mr-2 mb-1" />
              View podcast website
            </span>
          </a>
        </span>
      </section>
      <section className="player flex flex-col items-center mt-4 w-full">
        <h3 className="text-xl font-semibold mb-1">
          Listen to the lastest episode
        </h3>
        <p className="mb-4">{episodes[0].title}</p>
        <div className="border lg:w-2/3">
          <AudioPlayerComponents episodes={episodes} />
        </div>
      </section>
    </main>
  );
};

export default PodcastView;
