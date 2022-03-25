//CSS
import './NowPlaying.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext/UserContext';
import { UseRouteGuard } from '../../Hooks/UseRouteGuard/UseRouteGuard';
import { Back, FolderMusic } from '@icon-park/react';
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { ImageHolder } from '../../Components/ImageHolder/ImageHolder';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import { Button } from '../../Components/Button/Button';
import { PlayButton } from '../../Components/PlayButon/PlayButton';
import { SkipForward, SkipBack } from 'phosphor-react';
import { LoopButton } from '../../Components/LoopButton/LoopButton';
import { UseLocalStorage } from '../../Hooks/UseLocalStorage/UseLocalStorage';
import { ShuffelButton } from '../../Components/ShuffelButton/ShuffelButton';
// App Logic
export function NowPlaying() {
  const { ThemeData } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { RouteGuard } = UseRouteGuard(!user, '/sign-up');
  const { SetLocalStorage, GetLocalStorage } = UseLocalStorage();
  const {
    currentlyPlaying,
    setCurrentlyPlaying,
    progress,
    music,
    audioReference,
  } = useContext(MusicContext);
  // const { nowPlaying } = useParams();
  useEffect(() => {
    RouteGuard();
  }, [user, RouteGuard]);
  const LyricsRef = useRef();
  const [syncLyrics, setSyncLyrics] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSyncLyrics(true);
    }, 30000);
  }, []);
  useEffect(() => {
    syncLyrics &&
      currentlyPlaying &&
      LyricsRef.current.scrollTo(0, progress.toFixed(4) * 10);
  }, [syncLyrics, currentlyPlaying, progress]);
  const Navigate = useNavigate();
  const nextFunc = () => {
    Navigate(
      `/song/nowPlaying/:${
        currentlyPlaying ? currentlyPlaying.SongName : 'No Current Song'
      }`
    );
    const index = music.findIndex(
      (element) => element.SongName === currentlyPlaying.SongName
    );
    const nextSong =
      music[index === music.length - 1 ? index - index : index + 1];
    SetLocalStorage('currentlyPlaying', { ...nextSong, isPlaying: true });
    setCurrentlyPlaying(GetLocalStorage('currentlyPlaying'));
    audioReference.current.src = nextSong.MusicLink;
    audioReference.current.play();
  };
  const prevFunc = () => {
    const index = music.findIndex(
      (element) => element.SongName === currentlyPlaying.SongName
    );
    const nextSong = music[index === 0 ? music.length - 1 : index - 1];
    SetLocalStorage('currentlyPlaying', { ...nextSong, isPlaying: true });
    setCurrentlyPlaying(GetLocalStorage('currentlyPlaying'));
    audioReference.current.src = nextSong.MusicLink;
    audioReference.current.play();
    Navigate(
      `/song/nowPlaying/:${
        currentlyPlaying ? currentlyPlaying.SongName : 'No Current Song'
      }`
    );
  };
  const totalMin = Math.floor(music && audioReference.current.duration / 60);
  const totalSec = Math.floor(music && audioReference.current.duration % 60);
  const currentMin = Math.floor(
    music && audioReference.current.currentTime / 60
  );
  const currentSec = Math.floor(
    music && audioReference.current.currentTime % 60
  );

  return (
    <section className="nowPlaying page">
      <div className="nowplayingHeader">
        <div className="backContainer">
          <Back
            onClick={() => Navigate(-1)}
            theme="two-tone"
            size="30"
            fill={[ThemeData.depthColor, ThemeData.brandColor]}
          />
        </div>
        <div className="nowPlayingTitle">
          <p>Now Playing</p>
        </div>
        <div className="allSongIcon">
          <Link to="/all-songs">
            <FolderMusic
              theme="two-tone"
              size="30"
              fill={[ThemeData.depthColor, ThemeData.brandColor]}
            />
          </Link>
        </div>
      </div>
      <div
        className="nowPlayingHero"
        style={{
          padding: '0 0 30px 0',
          borderBottom: `solid 5px ${ThemeData.depthColor}`,
        }}
      >
        <ImageHolder
          borderRadius="8px"
          imageClassName={
            currentlyPlaying
              ? 'hasShadow'
              : 'isLoading hasShadow touchableOpacity'
          }
          width="200px"
          imageSource={currentlyPlaying && currentlyPlaying.MusicCoverImage}
        />
        <h1
          style={{
            wordSpacing: '10px',
            margin: '10px 0 5px',
            padding: currentlyPlaying ? '0' : '5px 15px',
          }}
        >
          {currentlyPlaying && currentlyPlaying.SongName}
        </h1>
        <p
          style={{
            padding: currentlyPlaying ? '0' : '3px 10px',
            color: ThemeData.primaryColorTwo,
          }}
        >
          {currentlyPlaying && currentlyPlaying.Artist}
        </p>
      </div>
      <div
        className={
          currentlyPlaying
            ? 'nowPlayingLyricsContainer'
            : 'nowPlayingLyricsContainer isLoading'
        }
      >
        <div className="nowplayingLyrics" ref={LyricsRef}>
          <p className="Lyrics" style={{ color: ThemeData.primaryColorTwo }}>
            {currentlyPlaying && currentlyPlaying.Lyrics}
          </p>
        </div>

        <Button
          event={() => setSyncLyrics(!syncLyrics)}
          content={`sync Lyrics ${syncLyrics ? '👍' : '👎'}`}
          width="100%"
          height="40px"
        />
      </div>
      <div className="previousPlayNextLoopShuffelContainer">
        <LoopButton />
        <SkipBack
          onClick={prevFunc}
          size={30}
          color={ThemeData.brandColor}
          weight="duotone"
        />
        <PlayButton size="80" />
        <SkipForward
          onClick={nextFunc}
          size={30}
          color={ThemeData.brandColor}
          weight="duotone"
        />
        <ShuffelButton />
      </div>
      <div
        className="songDuration"
        style={{ color: ThemeData.primaryColorTwo }}
      >
        <p>
          {currentMin < 10 ? `0${currentMin}` : currentMin}:
          {currentSec < 10 ? `0${currentSec}` : currentSec}
        </p>
        <p>
          {totalMin ? totalMin : '00'}:{totalSec ? totalSec : '00'}
        </p>
      </div>
      <div className="loader">
        {/* would only animate when music is playing */}
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
        <span
          style={{ backgroundColor: ThemeData.brandColorTwo }}
          className={
            audioReference.current.paused ? 'stroke' : 'wave isPlaying'
          }
        ></span>
      </div>
    </section>
  );
}
