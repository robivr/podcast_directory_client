import React, { useRef } from 'react';
import AudioPlayer from 'react-modern-audio-player';

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

interface AudioPlayerProps {
  audioUrl?: string;
  audioType?: string;
  episodes: Episode[];
}

const AudioPlayerComponents = (props: AudioPlayerProps) => {
  const { episodes } = props;

  const playlist = [
    { id: 0, src: episodes[0].enclosureUrl, name: episodes[0].title },
    { id: 1, src: episodes[1].enclosureUrl, name: episodes[1].title },
    { id: 2, src: episodes[2].enclosureUrl, name: episodes[2].title },
    { id: 3, src: episodes[3].enclosureUrl, name: episodes[3].title },
  ];

  const activeUI = {
    all: true,
  };

  return <AudioPlayer playList={playlist} activeUI={activeUI} />;
};

export default AudioPlayerComponents;
