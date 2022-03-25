import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import React ,{ useContext } from 'react';
import { RepeatOnce, Repeat } from 'phosphor-react';

//COMPONENTS

import { ToggleButton } from '../ToggleButton/ToggleButton';
export function LoopButton() {
  const { ThemeData } = useContext(ThemeContext);
  const { audioReference } = useContext(MusicContext);
  const LoopFunc = () => {
    audioReference.current.loop = true;
  };
  const unLoopFunc = () => {
    audioReference.current.loop = false;
  };
  return (
    <ToggleButton
      validator={audioReference.current.loop !== true}
      ifValidatorIsTrue={
        <Repeat
          onClick={LoopFunc}
          size={30}
          color={ThemeData.depthColor}
          weight="duotone"
        />
      }
      ifValidatorIsFalse={
        <RepeatOnce
          onClick={unLoopFunc}
          size={30}
          color={ThemeData.brandColorTwo}
          weight="duotone"
        />
      }
    />
  );
}
