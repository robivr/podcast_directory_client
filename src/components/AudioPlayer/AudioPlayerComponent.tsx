import React, { useEffect, useState } from 'react';
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

interface PlaylistItem {
  id: number;
  src: string;
  name: string;
  img: string;
}

const activeUI = {
  all: true,
  repeatType: false,
  trackInfo: false,
  artwork: false,
};

const AudioPlayerComponents = (props: AudioPlayerProps) => {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const { episodes } = props;

  useEffect(() => {
    const newPlaylist = episodes.map((ep, i) => {
      return {
        id: i,
        src: ep.enclosureUrl,
        name: ep.title,
        img: ep.image,
      };
    });
    setPlaylist(newPlaylist);
  }, []);

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
      }}
    />
  );
};

export default AudioPlayerComponents;
