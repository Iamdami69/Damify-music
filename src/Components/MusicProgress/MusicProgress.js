//CONTEXT
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import React ,{ useContext } from 'react';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
export function MusicProgress({
  trackClassName,
  trackWidth,
  trackHeight,
  trackIndicatorClassName,
  trackIndicatorWidth,
  trackIndicatorHeightSource,
  parentStyle,
}) {
  const { ThemeData } = useContext(ThemeContext);

  return (
    <div
      className={trackClassName}
      style={{
        width: trackWidth,
        height: trackHeight,
        backgroundColor: ThemeData.depthColor,
        borderRadius: '10px',
        ...parentStyle,
      }}
    >
      <div
        className={trackIndicatorClassName}
        style={{
          borderRadius: 'inherit',
          width: trackIndicatorWidth,
          height: `${trackIndicatorHeightSource}%`,
          backgroundColor: ThemeData.brandColor,
        }}
      ></div>
    </div>
  );
}
