import React ,{ useContext } from 'react';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import { SongList } from '../SongList/SongList';
import './RecentArtist.css';
export function RecentArtist() {
  const { music, musicPlaceholder } = useContext(MusicContext);
  const recentlyUploadedMusic = music
    ? music.slice(music.length - 4, music.length).reverse()
    : musicPlaceholder.slice(0, 4);
  return (
    <section style={{ flex: 2 }}>
      <h1 style={{ margin: '15px 0' }}>Recent Artist </h1>
      <div className="isGridList">
        {recentlyUploadedMusic.map((song) => (
          <SongList
            width="180px"
            key={song.id}
            className={
              song
                ? 'touchableOpacity isGridListChild hasShadow'
                : 'touchableOpacity isGridListChild hasShadow isLoading'
            }
            ImageSource={song.MusicCoverImage}
            artistName={null}
            songName={null}
            hasPlayButton={false}
            event={null}
          />
        ))}
      </div>
    </section>
  );
}

/** */
