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
  image: string;
}

interface AudioPlayerProps {
  audioUrl?: string;
  audioType?: string;
  episodes: Episode[];
}

const placement = {
  interface: {
    templateArea: {
      progress: 'row2-1',
      trackTimeCurrent: 'row2-3',
      trackTimeDuration: 'row2-4',
    },
  },
};

const AudioPlayerComponents = (props: AudioPlayerProps) => {
  const { episodes } = props;

  const playlist = [
    {
      id: 0,
      src: episodes[0].enclosureUrl,
      name: episodes[0].title,
      img: episodes[0].image,
    },
    {
      id: 1,
      src: episodes[1].enclosureUrl,
      name: episodes[1].title,
      img: episodes[1].image,
    },
    {
      id: 2,
      src: episodes[2].enclosureUrl,
      name: episodes[2].title,
      img: episodes[2].image,
    },
    {
      id: 3,
      src: episodes[3].enclosureUrl,
      name: episodes[3].title,
      img: episodes[3].image,
    },
  ];

  const activeUI = {
    all: true,
    repeatType: false,
    trackInfo: false,
    artwork: false,
  };

  return (
    <AudioPlayer
      rootContainerProps={{ colorScheme: 'light' }}
      playList={playlist}
      activeUI={activeUI}
      placement={{
        interface: {
          templateArea: {
            trackTimeCurrent: 'row1-1',
            trackTimeDuration: 'row1-3',
            progress: 'row1-2',
            playButton: 'row2-2',
            volume: 'row2-1',
            playList: 'row2-3',
            trackInfo: 'row3-1',
          },
        },
        // player: 'bottom-left',
      }}
    />
  );
};

export default AudioPlayerComponents;
