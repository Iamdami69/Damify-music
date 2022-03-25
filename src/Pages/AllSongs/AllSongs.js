import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SongList } from '../../Components/SongList/SongList';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import './AllSongs.css';
export function AllSongs() {
  const { ThemeData } = useContext(ThemeContext);
  const { music, musicPlaceholder } = useContext(MusicContext);
  const allSong = music ? music : musicPlaceholder;
  const Navigate = useNavigate();
  return (
    <section style={{ width: '100%', overflowY: 'scroll' }}>
      <>
        <div
          className="AllSongContainer GenreContainer"
          style={{ color: ThemeData.primaryBackground }}
        >
          {allSong.map((song) => (
            <div key={song.id} className="allSongContainer">
              <SongList
                textContainerSize="175px"
                width="130px"
                textClassName="genre"
                className={
                  music
                    ? 'touchableOpacity allSong isGridListChild hasShadow'
                    : 'touchableOpacity isGridListChild hasShadow isLoading'
                }
                ImageSource={song.MusicCoverImage}
                artistName={music && `${song.Artist}`}
                songName={song.SongName}
                hasPlayButton={!true}
                event={() => Navigate(`/all-songs/song/:${song.SongName}`)}
              />
            </div>
          ))}
        </div>
      </>
    </section>
  );
}
