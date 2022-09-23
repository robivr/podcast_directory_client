import React, { useRef } from 'react';

import styles from './AudioPlayer.module.css';

interface AudioPlayerProps {
  audioUrl: string;
  audioType: string;
}

const AudioPlayer = (props: AudioPlayerProps) => {
  const [playing, setPlaying] = React.useState(false);

  const audioElRef = useRef<HTMLAudioElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const currentDurationRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);

  const handlePlayClick = () => {
    if (!playing) {
      audioElRef.current!.play();
      setPlaying(true);
    }
  };

  const handlePauseClick = () => {
    if (playing) {
      audioElRef.current!.pause();
      setPlaying(false);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLAudioElement>) => {
    currentDurationRef.current!.style.width = `${
      (e.target.currentTime / e.target.duration) * 100
    }%`;
  };

  const handleMouseEnterDuration = (e: any) => {};

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickX = e.clientX;
    const durationWidth = durationRef.current!.offsetWidth;
    const offsetLeft = durationRef.current!.offsetLeft;
    const clickPercent = ((clickX - offsetLeft) / durationWidth) * 100;
    const newTime = (clickPercent / 100) * audioElRef.current!.duration;
    audioElRef.current!.currentTime = newTime;
  };

  const playSVG = (
    <svg
      viewBox="0.822 1.645 208.059 200.247"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      width="1em"
    >
      <path
        d="M 149.037 72.306 Q 155.63 64.028 162.223 72.306 L 218.432 142.889 Q 225.025 151.167 211.84 151.167 L 99.42 151.167 Q 86.235 151.167 92.828 142.889 Z"
        style={{ stroke: 'rgb(0, 0, 0)' }}
        transform="matrix(0, 1, -1, 0, 230.410309, -56.347675)"
      />
      <ellipse
        style={{
          fill: 'rgb(216, 216, 216)',
          stroke: 'rgb(0, 0, 0)',
          fillOpacity: 0,
          strokeWidth: '3px',
        }}
        cx="104.236"
        cy="100.945"
        rx="100.535"
        ry="96.834"
      />
    </svg>
  );

  const pauseSVG = (
    <svg
      viewBox="0.822 1.645 208.059 200.247"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      width="1em"
    >
      <ellipse
        style={{
          fill: 'rgb(216, 216, 216)',
          stroke: 'rgb(0, 0, 0)',
          fillOpacity: 0,
          strokeWidth: '3px',
        }}
        cx="104.236"
        cy="100.945"
        rx="100.535"
        ry="96.834"
      />
      <rect
        x="55"
        y="40"
        width="40"
        height="120"
        style={{ stroke: 'rgb(0, 0, 0)' }}
      />
      <rect
        x="110"
        y="40"
        width="40"
        height="120"
        style={{ stroke: 'rgb(0, 0, 0)' }}
      />
    </svg>
  );

  const pauseButton = (
    <button className={styles.button} onClick={handlePauseClick}>
      {pauseSVG}
    </button>
  );

  const playButton = (
    <button
      className={styles.button}
      onClick={handlePlayClick}
      ref={playButtonRef}
    >
      {playSVG}
    </button>
  );

  return (
    <div className={styles.player}>
      <div className={styles.player_left}>
        {playing ? pauseButton : playButton}
      </div>
      <div className={styles.player_middle}>
        <div
          className={styles.duration}
          onMouseEnter={handleMouseEnterDuration}
          onClick={handleSeekClick}
          ref={durationRef}
        >
          <div
            className={styles.current_duration}
            ref={currentDurationRef}
          ></div>
        </div>
      </div>
      <div>
        <audio ref={audioElRef} onTimeUpdate={handleTimeChange}>
          <source src={props.audioUrl} type={props.audioType} />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;
