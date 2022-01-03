import styled from "styled-components";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  currentSong,
  libraryStatus,
  isPlaying,
  setIsPlaying,
  darkMode,
}) => {
  return (
    <LibraryContainer active={libraryStatus} darkModeActive={darkMode}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          song={song}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          key={song.id}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          darkMode={darkMode}
        />
      ))}
    </LibraryContainer>
  );
};

const LibraryContainer = styled.div`
  background: #fefbf3;
  position: fixed;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  box-shadow: 2px 2px 50px rgb(204, 204, 211);
  overflow: scroll;
  overflow-x: hidden;
  transform: translateX(-100%);
  transition: all 0.5s ease;
  opacity: 0;
  h2 {
    padding: 1rem 2rem;
  }
  ${(props) => !props.active} {
    transform: translateX(0);
    opacity: 1;
  }
  ${(props) => !props.darkModeActive} {
    background: #04293f;
    box-shadow: 2px 2px 50px #000d27;
    h2 {
      color: #fefbf3;
    }
  }
  // scrollbar library
  scrollbar-width: thin;
  scrollbar-color: #fefbf3 transparent;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(118, 202, 218, 0.5);
    border-radius: 20px;
    border: transparent;
  }
  @media screen and (max-width: 960px) {
    width: 40%;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;

export default Library;
