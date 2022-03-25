import './Song.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { UserContext } from '../../Context/UserContext/UserContext';
import { UseRouteGuard } from '../../Hooks/UseRouteGuard/UseRouteGuard';
import { Back, DislikeTwo, Like, Headset, PlayTwo } from '@icon-park/react';
import { SongList } from '../../Components/SongList/SongList';
import { ImageHolder } from '../../Components/ImageHolder/ImageHolder';

// APP LOGIC
export function Song() {
  const { user } = useContext(UserContext);
  const { RouteGuard } = UseRouteGuard(!user, '/sign-up');
  const { songName } = useParams();
  const { music, updateCurrentlyPlaying, currentlyPlaying } =
    useContext(MusicContext);
  const { ThemeData } = useContext(ThemeContext);
  const Navigate = useNavigate();
  const nowPlaying = (music) => {
    music && updateCurrentlyPlaying(music);
    Navigate(`/song/nowPlaying/:${music && music.SongName}`);
  };
  useEffect(() => {
    RouteGuard();
  }, [user, RouteGuard, music]);
  const currentSong =
    music && music.find((song) => song.SongName === songName.replace(':', ''));
  return (
    <section className="song page">
      <div
        className="Songheader"
        style={{
          color: ThemeData.primaryColorTwo,
          backgroundColor: ThemeData.depthColor,
        }}
      >
        <div className="backAndIsFavButton">
          <Back
            onClick={() => Navigate(-1)}
            theme="two-tone"
            size="40"
            fill={[ThemeData.depthColorTwo, ThemeData.brandColor]}
          />
          {currentlyPlaying && currentlyPlaying.isFav ? (
            <Like
              theme="two-tone"
              size="40"
              fill={[ThemeData.depthColorTwo, ThemeData.brandColor]}
            />
          ) : (
            <DislikeTwo
              theme="two-tone"
              size="40"
              fill={[ThemeData.depthColor, ThemeData.brandColor]}
            />
          )}
        </div>
        <div className="songDetails">
          <ImageHolder
            width="120px"
            borderRadius="5px"
            event={null}
            imageClassName={
              music
                ? 'hasShadow touchableOpacity'
                : 'hasShadow touchableOpacity isLoading'
            }
            imageSource={currentSong && currentSong.MusicCoverImage}
          />
          <div className="songDetailsText">
            <h3>{currentSong && currentSong.SongName}</h3>
            <div className="divforptext">
              <div>
                <h2>Uploaded On</h2>
                <p>{currentSong && currentSong.DataUploaded}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="similarSongsAndPlayButton">
          {/* buttonWithIcon */}
          <button
            className="buttonWithIcon"
            style={{ border: `solid 3px ${ThemeData.depthColorTwo}` }}
          >
            <Headset
              theme="two-tone"
              size="40"
              fill={[ThemeData.depthColorTwo, ThemeData.brandColor]}
            />
          </button>
          <button
            style={{ border: `solid 3px ${ThemeData.depthColorTwo}` }}
            className="buttonWithIcon"
            onClick={() => nowPlaying(music && currentSong)}
          >
            <PlayTwo
              theme="two-tone"
              size="40"
              fill={[ThemeData.depthColorTwo, ThemeData.brandColor]}
            />
          </button>
        </div>
      </div>
      <div className="SimilarSongsBlock">
        <h1
          style={{
            color: ThemeData.primaryColorTwo,
            padding: '10px',
            margin: '10px ',
            fontSize: '2rem',
          }}
        >
          {music && 'Similar Songs'}
        </h1>
        <div className="SiimlarSongContainer">
          {music &&
            music.map(
              (song) =>
                song.Genre.includes(currentSong.Genre[0]) && (
                  <div key={song.id} className="gernreListContainer">
                    <SongList
                      textContainerSize="125px"
                      width="100px"
                      textClassName="genre"
                      className={
                        music
                          ? 'touchableOpacity isGridListChild hasShadow'
                          : 'touchableOpacity isGridListChild hasShadow isLoading'
                      }
                      ImageSource={song.MusicCoverImage}
                      artistName={music && `${song.Artist}`}
                      songName={song.SongName}
                      hasPlayButton={true}
                      event={() =>
                        Navigate(`/all-songs/song/:${song.SongName}`)
                      }
                    />
                  </div>
                )
            )}
        </div>
      </div>
    </section>
  );
}
