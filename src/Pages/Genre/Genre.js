import './Genre.css';
import { useParams } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import { UseRouteGuard } from '../../Hooks/UseRouteGuard/UseRouteGuard';
import { UserContext } from '../../Context/UserContext/UserContext';
import { Header } from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { SongList } from '../../Components/SongList/SongList';

// APP LOGIC
export function Genre() {
  const { user } = useContext(UserContext);
  const { RouteGuard } = UseRouteGuard(!user, '/sign-up');
  const { genreName } = useParams();
  const { music, musicPlaceholder } = useContext(MusicContext);

  const Navigate = useNavigate();
  useEffect(() => {
    RouteGuard();
  }, [user, RouteGuard, music]);

  return (
    <section className="Genre page">
      <Header />
      <h1
        className="hasDancingFont"
        style={{ margin: '20px 0', textAlign: 'center' }}
      >
        {genreName.replace(':', '').toUpperCase()}{' '}
      </h1>
      <div className="GenreContainer">
        {music &&
          genreName &&
          music.map(
            (song) =>
              song.Genre.includes(genreName.replace(':', '')) && (
                <div key={song.id} className="gernreListContainer">
                  <SongList
                    textContainerSize="175px"
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
                    event={() => Navigate(`/all-songs/song/:${song.SongName}`)}
                  />
                </div>
              )
          )}
      </div>
      {!music && (
        <div className="GenreContainer" style={{ width: '100px' }}>
          {!music &&
            musicPlaceholder.map((genrePlaceholder, index) => (
              <SongList
                textClassName="genre"
                key={index}
                className={'touchableOpacity  hasShadow isLoading'}
                ImageSource={'null'}
                // artistName={null}
                // songName={null}
                hasPlayButton={true}
                event={() => Navigate(`/all-songs/song/:Loading Song`)}
              />
            ))}
        </div>
      )}
    </section>
  );
}
