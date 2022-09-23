import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPodcast } from 'react-icons/fa';

import styles from './PodcastView.module.css';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

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
    <main className={styles.main}>
      <section className={styles.podcast_info}>
        <section className={styles.podcast_info__left}>
          <img
            src={podcast.artwork}
            alt={podcast.title + ' podcast artwork'}
            className={styles.podcast_artwork}
          />
          <section>
            <p className={styles.podcast_description}>{podcast.description}</p>
            <span className={styles.hosted_by}>hosted by</span>
            <p className={styles.podcast_author}>{podcast.author}</p>
          </section>
        </section>
        <section className={styles.podcast_info__right}>
          <h1 className={styles.podcast_title}>{podcast.title}</h1>
          <p className={styles.podcast_episode_count}>
            {podcast.episodeCount} episodes
          </p>
          <a href={podcast.link}>
            <button>
              <FaPodcast />
              Listen to this podcast
            </button>
          </a>
          <div>
            <h4>Latest episode</h4>
            <p>{episodes[0].title}</p>
            <AudioPlayer
              audioUrl={episodes[0].enclosureUrl}
              audioType={episodes[0].enclosureType}
            />
          </div>
        </section>
      </section>
    </main>
  );
};

export default PodcastView;
