import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import React ,{ useContext } from 'react';
import { VolumeMute, VolumeSmall } from '@icon-park/react';
//COMPONENTS

import { ToggleButton } from '../ToggleButton/ToggleButton';
export function MuteButton() {
  const { ThemeData } = useContext(ThemeContext);
  const { audioReference } = useContext(MusicContext);
  const muteFunc = () => {
    audioReference.current.muted = true;
  };
  const unMuteFunc = () => {
    audioReference.current.muted = false;
  };
  return (
    <ToggleButton
      validator={audioReference.current.muted !== true}
      ifValidatorIsTrue={
        <VolumeSmall
          onClick={muteFunc}
          theme="two-tone"
          size="40"
          fill={[ThemeData.depthColor, ThemeData.brandColor]}
        />
      }
      ifValidatorIsFalse={
        <VolumeMute
          onClick={unMuteFunc}
          theme="two-tone"
          size="40"
          fill={[ThemeData.depthColor, ThemeData.brandColor]}
        />
      }
    />
  );
}
