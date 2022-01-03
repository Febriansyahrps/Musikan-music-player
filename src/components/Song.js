import styled from "styled-components";

const Song = ({ currentSong, isPlaying, darkMode }) => {
  return (
    <SongContainer active={isPlaying} darkModeActive={darkMode}>
      <img alt={currentSong.name} src={currentSong.cover} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </SongContainer>
  );
};

const SongContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 25%;
    border-radius: 50%;
  }
  h2 {
    padding: 0.5rem 0 0 0;
  }
  ${(props) => !props.active} {
    img {
      -webkit-animation: spin 10s linear infinite;
      -moz-animation: spin 10s linear infinite;
      animation: spin 10s linear infinite;
    }
  }
  ${(props) => !props.darkModeActive} {
    h2 {
      color: #fefbf3;
    }
    h3 {
      color: #fefbf3;
    }
  }
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media (max-width: 960px) {
    img {
      width: 40%;
    }
  }
  @media (min-height: 1200px) {
    img {
      width: 50%;
    }
  }
  @media (max-width: 640px) {
    min-height: 60vh;
    img {
      width: 60%;
    }
  }
`;

export default Song;
