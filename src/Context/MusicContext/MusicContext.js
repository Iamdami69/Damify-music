import React, { createContext, useState, useRef, useEffect } from 'react';
import { UseLocalStorage } from '../../Hooks/UseLocalStorage/UseLocalStorage';
import { MusicData } from './MusicData';

// CREATE CONTEXT
export const MusicContext = createContext();

export function MusicContextProvider({ children }) {
  const { GetLocalStorage, SetLocalStorage } = UseLocalStorage();
  const [music, setMusic] = useState(
    GetLocalStorage('musicData') ||
      (GetLocalStorage('deleteAllMusic') === null && MusicData)
  );
  // || true ? /*MusicData */ [4] : null
  const musicPlaceholder = new Array(30).fill({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState(
    GetLocalStorage('currentlyPlaying')
  );
  //ALL UNIQUE MUSIC GENRES
  const Genres = music ? music.map((song) => song.Genre) : musicPlaceholder;
  //[...new Set(myArray)];
  const allGenres = [].concat.apply([], Genres);
  const uniqueGenres = music ? [...new Set(allGenres)] : Genres;
  //MUSIC STATE
  const audioReference = useRef({ paused: true });
  const [progress, setProgress] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  //Update currently Playing
  const updateCurrentlyPlaying = (song) => {
    song && SetLocalStorage('currentlyPlaying', { ...song, isPlaying: true });
    song && setCurrentlyPlaying(GetLocalStorage('currentlyPlaying'));
    audioReference.current.src = song && song.MusicLink;
    song && audioReference.current.play();
  };
  //IF MUSIC IS PLAYING DO THE CODE BELOW
  const MusicIsPLaying = ({ target }) => {
    setProgress((target.currentTime / target.duration) * 100);
    //IF MUSIC HAS FINISHED PLAYING MOVE TO THE NEXT SONG AND SAVE CURRENTLY PLAYING TO LOCALSTORAGE
    if (target.ended) {
      const index = music.findIndex(
        (element) => element.SongName === currentlyPlaying.SongName
      );
      const nextSong =
        music[index === music.length - 1 ? index - index : index + 1];
      SetLocalStorage('currentlyPlaying', { ...nextSong, isPlaying: true });
      setCurrentlyPlaying(GetLocalStorage('currentlyPlaying'));
      audioReference.current.src = nextSong.MusicLink;
      audioReference.current.play();
    }
  };
  useEffect(() => {
    audioReference.current.src = currentlyPlaying && currentlyPlaying.MusicLink;
  }, []);
  return (
    <MusicContext.Provider
      value={{
        uniqueGenres,
        music,
        setMusic,
        musicPlaceholder,
        updateCurrentlyPlaying,
        currentlyPlaying,
        audioReference,
        progress,
        setCurrentlyPlaying,
        setProgress,
      }}
    >
      {progress.current}
      <audio
        src=""
        controls
        style={{ display: 'none' }}
        onTimeUpdate={MusicIsPLaying}
        ref={audioReference}
      />
      {children}
    </MusicContext.Provider>
  );
}
