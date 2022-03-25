import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import React ,{ useContext } from 'react';
import { Like, DislikeTwo } from '@icon-park/react';
//COMPONENTS
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { UseLocalStorage } from '../../Hooks/UseLocalStorage/UseLocalStorage';

export function IsFavoriteButton() {
  const { SetLocalStorage, GetLocalStorage } = UseLocalStorage();
  const { ThemeData } = useContext(ThemeContext);
  const { music, setCurrentlyPlaying, currentlyPlaying } =
    useContext(MusicContext);
  const likeOrDisLike = () => {
    SetLocalStorage('currentlyPlaying', {
      ...currentlyPlaying,
      isFav: !currentlyPlaying.isFav,
    });

    setCurrentlyPlaying(GetLocalStorage('currentlyPlaying'));
  };
  return (
    <ToggleButton
      validator={currentlyPlaying && currentlyPlaying.isFav}
      ifValidatorIsTrue={
        <Like
          onClick={likeOrDisLike}
          theme="two-tone"
          size="40"
          fill={[ThemeData.depthColor, ThemeData.brandColor]}
        />
      }
      ifValidatorIsFalse={
        <DislikeTwo
          onClick={currentlyPlaying && likeOrDisLike}
          theme="two-tone"
          size="40"
          fill={[ThemeData.depthColor, ThemeData.brandColor]}
        />
      }
    />
  );
}
