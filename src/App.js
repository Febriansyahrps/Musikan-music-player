import { useState } from "react";
// import components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// import data
import data from "./data";
// import style
import styled from "styled-components";
import GlobalStyle from "./components/GlobalStyle";

function App() {
  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppContainer libraryActive={libraryStatus} darkModeActive={darkMode}>
      <GlobalStyle />
      <Nav
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song
        currentSong={currentSong}
        isPlaying={isPlaying}
        darkMode={darkMode}
      />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songs={songs}
        setCurrentSong={setCurrentSong}
        libraryStatus={libraryStatus}
        darkMode={darkMode}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        libraryStatus={libraryStatus}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        darkMode={darkMode}
      />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background: #fefbf3;
  transition: all 0.5s ease;
  ${(props) => !props.libraryActive} {
    margin-left: 20rem;
  }
  ${(props) => !props.darkModeActive} {
    background: #04293f;
  }
`;

export default App;
