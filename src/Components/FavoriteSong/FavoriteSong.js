import React ,{ useContext } from 'react';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import './FavoriteSong.css';
import { HeadphoneSound } from '@icon-park/react';

export function FavouriteSong() {
  const { music, musicPlaceholder, updateCurrentlyPlaying } =
    useContext(MusicContext);
  const { ThemeData } = useContext(ThemeContext);
  const recentlyFavouriteMusic = music
    ? music
        .map((song) => song.isFav && song)
        .slice(music.length - 15, music.length)
    : musicPlaceholder.slice(0, 15);
  return (
    <section className="FavouriteMusic">
      <h1 style={{ margin: '10px 0' }}>Favourite Music</h1>
      <>
        {recentlyFavouriteMusic.map(
          (favMusic, index) =>
            favMusic && (
              <div
                onClick={() => updateCurrentlyPlaying(favMusic)}
                key={index}
                className={
                  music
                    ? 'FavMusic touchableOpacity'
                    : 'touchableOpacity  isLoading'
                }
                style={{
                  backgroundColor: ThemeData.primaryBackground,
                  padding: '10px 5px',
                  margin: '10px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderRadius: '5px',
                  width: '100%',
                }}
              >
                <div
                  className="picAndTitle"
                  style={{
                    width: '80%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {music && (
                    <img
                      src={favMusic.MusicCoverImage}
                      alt={favMusic.SongName}
                      className="favMusicImage"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '5px',
                        margin: '0 5px 0 0',
                      }}
                    />
                  )}
                  <div style={{ width: '100%', whiteSpace: 'nowarp' }}>
                    <h4 style={{ whitespace: 'nowarp' }}>{favMusic.Artist}</h4>
                    <p>{favMusic.SongName}</p>
                  </div>
                </div>
                <div
                  className="playButtonAndPauseButton"
                  style={{
                    width: '20%',
                    display: 'flex',
                    alignItems: 'center',
                    height: !music && '40px',
                  }}
                >
                  <HeadphoneSound
                    theme="two-tone"
                    size="40"
                    fill={[ThemeData.depthColor, ThemeData.brandColor]}
                  />
                </div>
              </div>
            )
        )}
      </>
    </section>
  );
}
