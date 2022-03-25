import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import React ,{ useContext } from 'react';
import { PlayOne, PauseOne } from '@icon-park/react';

import { ToggleButton } from '../ToggleButton/ToggleButton';
export function PlayButton({ size = '40' }) {
  const { ThemeData } = useContext(ThemeContext);
  const { audioReference } = useContext(MusicContext);
  const playSong = () => {
    audioReference.current.play();
  };
  return (
    <ToggleButton
      validator={audioReference.current.paused}
      ifValidatorIsTrue={
        <PlayOne
          onClick={playSong}
          theme="two-tone"
          size={size}
          fill={[ThemeData.depthColor, ThemeData.brandColor]}
        />
      }
      ifValidatorIsFalse={
        <PauseOne
          onClick={() => audioReference.current.pause()}
          theme="two-tone"
          size={size}
          fill={[ThemeData.depthColor, ThemeData.brandColor]}
        />
      }
    />
  );
}
