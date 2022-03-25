import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import React, { useContext, useState } from 'react';
import { Shuffle } from 'phosphor-react';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { UseLocalStorage } from '../../Hooks/UseLocalStorage/UseLocalStorage';
export function ShuffelButton() {
  const { ThemeData } = useContext(ThemeContext);
  const { music, setMusic } = useContext(MusicContext);
  const { SetLocalStorage, GetLocalStorage } = UseLocalStorage();
  const [shuffel, setShuffel] = useState(GetLocalStorage('musicIsShuffeled'));
  const shuffelSongs = () => {
    setShuffel(!shuffel);
    localStorage.setItem('musicIsShuffeled', JSON.stringify(true));
    SetLocalStorage('previouslyUnShuffled', music);

    SetLocalStorage('musicData', music);
    setMusic(GetLocalStorage('musicData'));
    setTimeout(() => {
      setMusic(music.sort(() => 0.5 - Math.random()));
    }, 100);
  };
  const unShuffelSongs = () => {
    setShuffel(!shuffel);
    localStorage.setItem('musicIsShuffeled', JSON.stringify(false));
    SetLocalStorage('musicData', GetLocalStorage('previouslyUnShuffled'));
    setMusic(GetLocalStorage('previouslyUnShuffled'));
    setMusic(GetLocalStorage('musicData'));
  };
  return (
    <ToggleButton
      validator={!shuffel}
      ifValidatorIsTrue={
        <Shuffle
          onClick={shuffelSongs}
          size={30}
          color={ThemeData.depthColorTwo}
          weight="duotone"
        />
      }
      ifValidatorIsFalse={
        <Shuffle
          onClick={unShuffelSongs}
          size={30}
          color={ThemeData.brandColorTwo}
          weight="duotone"
        />
      }
    />
  );
}
