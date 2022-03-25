import React ,{ useContext } from 'react';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { Link } from 'react-router-dom';
import './Genres.css';
import { Button } from '../Button/Button';
export function Genres() {
  const { music, musicPlaceholder, uniqueGenres } = useContext(MusicContext);
  const { ThemeData } = useContext(ThemeContext);
  const Genres = music ? music.map((song) => song.Genre) : musicPlaceholder;
  return (
    <section className="Genres">
      <h1 style={{ margin: '10px 0' }}>Genres</h1>
      <div className="GenresContainer">
        {Genres && (
          <>
            {uniqueGenres.slice(0, 18).map((uniqueGenre, index) => (
              <Link
                to={`/genre/:${music ? uniqueGenre : 'Loading Genres'}`}
                style={{ color: ThemeData.primaryColor }}
                key={index}
              >
                <div
                  className={
                    music ? 'touchableOpacity' : 'touchableOpacity  isLoading'
                  }
                  style={{
                    border: `solid 3px ${ThemeData.depthColorDarkest}`,
                    borderRadius: '8px',
                    padding: music ? '10px 0' : '30px 0',
                    textAlign: 'center',
                    backgroundColor: ThemeData.depthColor,
                  }}
                >
                  <p style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {music && `#${uniqueGenre}`}
                  </p>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
      <Link to="/all-genre">
        <Button content="All Genres" width="100%" height="40px" />
      </Link>
    </section>
  );
}
