import './AllGenre.css';
import { UserContext } from '../../Context/UserContext/UserContext';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import { Header } from '../../Components/Header/Header';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { UseRouteGuard } from '../../Hooks/UseRouteGuard/UseRouteGuard';
import { SongList } from '../../Components/SongList/SongList';
import { useNavigate } from 'react-router-dom';

// App Logic
export function AllGenre() {
  const { user } = useContext(UserContext);
  const { RouteGuard } = UseRouteGuard(!user, '/sign-up');
  const { uniqueGenres, music } = useContext(MusicContext);
  const Navigate = useNavigate();

  useEffect(() => {
    RouteGuard();
  }, [user, RouteGuard, music]);

  return (
    <section className="AllGenres page">
      <Header />
      <div className="allGerne">
        {uniqueGenres && (
          <>
            {uniqueGenres.map((uniqueGenre) => (
              <Link
                key={uniqueGenre}
                to={`/genre/:${music ? uniqueGenre : 'Loading Genres'}`}
              >
                <SongList
                  textClassName="genre"
                  textContainerSize=""
                  className={
                    music
                      ? 'touchableOpacity isGridListChild hasShadow'
                      : 'touchableOpacity isGridListChild hasShadow isLoading'
                  }
                  ImageSource={null}
                  artistName={music && `#${uniqueGenre}`}
                  songName={null}
                  hasPlayButton={true}
                  event={() =>
                    Navigate(`/all-songs/song/:${music && music.SongName}`)
                  }
                />
              </Link>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
