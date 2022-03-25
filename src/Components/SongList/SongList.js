import './SongList.css';
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { ImageHolder } from '../ImageHolder/ImageHolder';
import { PlayTwo } from '@icon-park/react';
import React, { useContext } from 'react';
export function SongList({
  className,
  ImageSource,
  songName,
  artistName,
  textClassName,
  event,
  hasPlayButton,
  width = '200px',
  textContainerSize = '160px',
}) {
  const { ThemeData } = useContext(ThemeContext);
  return (
    <div
      className={className}
      onClick={event}
      style={{
        backgroundColor: ThemeData.depthColor,
        borderRadius: '5px',
      }}
    >
      {ImageSource && (
        <ImageHolder
          imageSource={ImageSource}
          width={width}
          borderRadius="8px"
          className="hasOverlay"
          // imageClassName="touchableOpacity"
        />
      )}

      <div
        style={{
          display: hasPlayButton && 'flex',
          justifyContent: hasPlayButton && 'space-between',
          alignItems: hasPlayButton && 'center',
        }}
      >
        <div
          style={{
            width: textContainerSize,
            color: ThemeData.primaryColorTwo,
          }}
        >
          <h3
            className={textClassName}
            style={{
              textTransform: 'capitalize',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {artistName}
          </h3>
          <p
            style={{
              textTransform: 'capitalize',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {songName}
          </p>
        </div>
        {hasPlayButton && (
          <PlayTwo
            theme="two-tone"
            size="40"
            fill={[ThemeData.depthColorTwo, ThemeData.brandColor]}
          />
        )}
      </div>
    </div>
  );
}
