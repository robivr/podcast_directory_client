import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPodcast } from 'react-icons/fa';

import styles from './PodcastView.module.css';

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

const PodcastView = (props: any) => {
  let params = useParams();
  console.log('PodcastView', params);
  const [podcast, setPodcast] = useState<Podcast | null>(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/podcast/${params.id}`
      );
      const data = await res.json();

      console.log(data);
      setPodcast(data.feed);
    };

    fetchPodcast();
  }, []);

  if (podcast === null) {
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
        </section>
      </section>
    </main>
  );
};

export default PodcastView;
