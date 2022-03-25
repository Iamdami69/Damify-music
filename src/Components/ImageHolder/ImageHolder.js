import React from 'react';
export function ImageHolder({
  imageClassName,
  overlay,
  width,
  borderRadius,
  imageSource,
  hasMargin,
  event,
}) {
  return (
    <div
      onClick={event}
      className={imageClassName}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundImage: imageSource && `url(${imageSource})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius,
        aspectRatio: '1/1',
        width: width,
        margin: hasMargin && '0 10px',
      }}
    >
      {overlay && (
        <div
          style={{
            width: '100%',
            height: ' 100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 'inherit',
          }}
        ></div>
      )}
    </div>
  );
}
