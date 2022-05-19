import React from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  audioType: string;
}

const AudioPlayer = (props: AudioPlayerProps) => {
  return (
    <div>
      <audio controls>
        <source src={props.audioUrl} type={props.audioType} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
