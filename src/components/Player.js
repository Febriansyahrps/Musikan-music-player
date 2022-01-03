import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeUp,
  faRandom,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setCurrentSong,
  libraryStatus,
  darkMode,
}) => {
  // ref
  const audioRef = useRef(null);
  // event handler
  const playSongHandler = () => {
    if (isPlaying) {
      // pause song
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      // play song
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  // autoplay song
  const autoPlaySong = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  // skip track handler
  const skipTrackHandler = async (direction) => {
    setIsPlaying((isPlaying = true));
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "next") {
      if (randomSong) {
        await nextRandomSong(currentIndex);
      } else {
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      }
    } else {
      await setCurrentSong(
        songs[(currentIndex - 1 + songs.length) % songs.length]
      );
    }
  };
  // auto next song
  const autoNextSong = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (repeat) {
      await repeatSong();
    } else {
      if (isPlaying) {
        audioRef.current.play();
        if (randomSong) {
          await nextRandomSong(currentIndex);
        } else {
          await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }
      }
    }
  };
  // get time from audio
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // rounded the time
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const currentSongPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setSongInfo({
      ...songInfo,
      currentTime: current,
      durationTime: duration,
      songPercentage: currentSongPercentage,
    });
  };
  //  time handler
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  // change volume
  const volumeChanger = (e) => {
    const currentVolume = (audioRef.current.volume = e.target.value / 100);
    setVolume(currentVolume);
  };
  // edit time number
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  // next random song
  const nextRandomSong = async (currentIndex) => {
    await setCurrentSong(
      songs[
        (currentIndex + Math.floor(Math.random() * songs.length)) % songs.length
      ]
    );
  };
  // repeat song
  const repeatSong = async () => {
    audioRef.current.play();
  };

  // state
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    durationTime: 0,
    songPercentage: 0,
  });
  const [volume, setVolume] = useState(1);
  const [randomSong, setRandomSong] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // styling Animation
  const trackAnim = {
    transform: `translateX(${songInfo.songPercentage}%)`,
  };
  const trackBackground = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  return (
    <PlayerContainer>
      <TimePlayer darkModeActive={darkMode}>
        <p>{getTime(songInfo.currentTime)}</p>
        <Track style={trackBackground}>
          <input
            min={0}
            max={songInfo.durationTime || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <AnimateTrack style={trackAnim}></AnimateTrack>
        </Track>
        <p>{getTime(songInfo.durationTime || 0)}</p>
      </TimePlayer>
      <PlayControl>
        <PlayerButton
          darkModeActive={darkMode}
          active={randomSong}
          onClick={() => setRandomSong(!randomSong)}
        >
          <FontAwesomeIcon size="2x" icon={faRandom} />
        </PlayerButton>
        <PlayerButton
          darkModeActive={darkMode}
          onClick={() => skipTrackHandler("back")}
        >
          <FontAwesomeIcon size="2x" icon={faAngleLeft} />
        </PlayerButton>
        <PlayerButton darkModeActive={darkMode} onClick={playSongHandler}>
          <FontAwesomeIcon size="2x" icon={isPlaying ? faPause : faPlay} />
        </PlayerButton>
        <PlayerButton
          darkModeActive={darkMode}
          onClick={() => skipTrackHandler("next")}
        >
          <FontAwesomeIcon size="2x" icon={faAngleRight} />
        </PlayerButton>
        <PlayerButton
          darkModeActive={darkMode}
          active={repeat}
          onClick={() => setRepeat(!repeat)}
        >
          <FontAwesomeIcon size="2x" icon={faSync} />
        </PlayerButton>
      </PlayControl>
      <VolumeControl libraryActive={libraryStatus} darkModeActive={darkMode}>
        <div className="volume">
          <input
            type="range"
            min={0}
            max={100}
            value={volume * 100}
            onChange={volumeChanger}
          />
        </div>
        <FontAwesomeIcon size="2x" icon={faVolumeUp} />
      </VolumeControl>
      <audio
        onLoadedData={autoPlaySong}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef} // add ref
        src={currentSong.audio}
        onEnded={autoNextSong}
      ></audio>
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  @media screen and (min-height: 1200px) {
    min-height: 20vh;
  }
`;
const TimePlayer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  input {
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  p {
    padding: 1rem;
    color: #04293f;
  }
  ${(props) => !props.darkModeActive} {
    p {
      color: #fefbf3;
    }
  }
  @media screen and (max-width: 960px) {
    width: 75%;
  }
  @media screen and (min-height: 1200px) {
    width: 75%;
  }
  @media screen and (max-width: 640px) {
    p {
      font-size: 0.75rem;
    }
    width: 100%;
  }
`;
const PlayControl = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-around;
  @media screen and (max-width: 960px) {
    width: 60%;
  }
  @media screen and (min-height: 1200px) {
    width: 60%;
  }
  @media screen and (max-width: 640px) {
    width: 80%;
  }
`;
const PlayerButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  color: #04293f;
  transition: 0.25s all ease-in;
  ${(props) => !props.active} {
    color: #000;
  }
  ${(props) => !props.darkModeActive} {
    color: #fefbf3;
    opacity: 75%;
    ${(props) => !props.active} {
      opacity: 100%;
      color: #fff;
    }
  }
`;
const VolumeControl = styled.div`
  position: absolute;
  transition: 0.25s ease-in;
  right: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
  color: #04293f;
  ${(props) => !props.libraryActive} {
    right: 10%;
  }
  ${(props) => !props.darkModeActive} {
    color: #fefbf3;
    opacity: 75%;
  }
  input {
    height: 15vh;
    width: 1rem;
    -webkit-appearance: slider-vertical;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    cursor: pointer;
    background: #c4dddd;
    border-radius: 1rem;
  }
  @media screen and (max-width: 960px) {
    right: 5%;
    ${(props) => !props.libraryActive} {
      right: 2%;
    }
  }
  @media screen and (min-height: 1200px) {
    right: 7.5%;
    ${(props) => !props.libraryActive} {
      right: 5%;
    }
    input {
      height: 12.5vh;
    }
  }
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

// Range styled
const Track = styled.div`
  width: 100%;
  height: 100%;
  height: 1rem;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  /* input range */
  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
  }

  input[type="range"]::-moz-slider-thumb {
    -webkit-appearance: none;
    background: transparent;
    border: none;
  }
`;
const AnimateTrack = styled.div`
  transition: all 1s ease;
  background: #c4dddd;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  pointer-events: none;
`;
export default Player;
