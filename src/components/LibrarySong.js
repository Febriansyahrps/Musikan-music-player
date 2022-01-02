import styled from "styled-components";

const LibrarySong = ({
  song,
  setCurrentSong,
  currentSong,
  isPlaying,
  setIsPlaying,
  darkMode,
}) => {
  // event handler
  const songSelectorHandler = () => {
    setCurrentSong(song);
    setIsPlaying((isPlaying = true));
  };
  return (
    <LibrarySongContainer
      darkModeActive={darkMode}
      onClick={songSelectorHandler}
      selected={song.id === currentSong.id ? true : false}
    >
      <img alt={song.name} src={song.cover} />
      <DescriptionSong darkModeActive={darkMode}>
        <h4>{song.name}</h4>
        <h5>{song.artist}</h5>
      </DescriptionSong>
    </LibrarySongContainer>
  );
};

const LibrarySongContainer = styled.div`
  background: #fefbf3;
  display: flex;
  align-items: center;
  padding: 1rem 1rem 1rem 2rem;
  cursor: pointer;
  img {
    width: 30%;
  }
  &:hover {
    background-color: #c4dddd;
  }
  ${(props) => !props.selected} {
    background: #76cada;
  }
  ${(props) => !props.darkModeActive} {
    background: #04293f;
    &:hover {
      background-color: #2c4d54;
    }
    ${(props) => !props.selected} {
      background: #116779;
    }
  }
`;

const DescriptionSong = styled.div`
  padding: 1rem;
  h4 {
    font-size: 1rem;
  }
  h5 {
    font-size: 0.75rem;
  }
  ${(props) => !props.darkModeActive} {
    h4 {
      color: #fefbf3;
    }
    h5 {
      color: #fefbf3;
    }
  }
`;

export default LibrarySong;
