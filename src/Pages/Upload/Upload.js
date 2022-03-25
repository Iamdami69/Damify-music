import React, { useContext, useEffect, useRef, useState } from 'react';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import { UserContext } from '../../Context/UserContext/UserContext';
import { UseLocalStorage } from '../../Hooks/UseLocalStorage/UseLocalStorage';
import { UseRouteGuard } from '../../Hooks/UseRouteGuard/UseRouteGuard';
import { useUuid } from '../../Hooks/UseUuid/UseUuid';
import { Upload as UPLOAD } from 'phosphor-react';
import { Button } from '../../Components/Button/Button';
import './Upload.css';
import { useNavigate } from 'react-router-dom';
export function Upload() {
  const uploadInput = useRef();
  const newSongSongName = useRef();
  const newSongArtist = useRef();
  const newSongMusicCoverImage = useRef();
  const newSongArtistProfileImage = useRef();
  const newSongGenre = useRef();
  const newSongLyrics = useRef();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { RouteGuard } = UseRouteGuard(!user, '/sign-up');
  const { GetLocalStorage, SetLocalStorage } = UseLocalStorage();
  const { music, setMusic } = useContext(MusicContext);
  const { ThemeData } = useContext(ThemeContext);
  const { id } = useUuid();
  const [newSong, setNewSong] = useState({
    isFav: false,
    DataUploaded: new Date().toDateString(),
    SongName: null,
    Artist: null,
    MusicLink: null,
    MusicCoverImage: null,
    ArtistProfileImage: null,
    Genre: [],
    Lyrics: null,
    isPlaying: false,
    id: id,
  });
  useEffect(() => {
    RouteGuard();
  }, [RouteGuard]);
  const newSongSongNameFormFunc = (e) => {
    e.preventDefault();
    setNewSong({
      ...newSong,
      SongName: newSongSongName.current.value,
    });
  };
  const newSongArtistFormFunc = (e) => {
    e.preventDefault();
    setNewSong({
      ...newSong,
      Artist: newSongArtist.current.value,
    });
  };
  const newSongCoverImageFunc = (e) => {
    e.preventDefault();
    setNewSong({
      ...newSong,
      MusicCoverImage:
        newSongMusicCoverImage.current.files &&
        window.URL.createObjectURL(newSongMusicCoverImage.current.files[0]),
    });
  };
  const newSongArtistProfileImageFunc = (e) => {
    e.preventDefault();
    setNewSong({
      ...newSong,
      ArtistProfileImage:
        newSongArtistProfileImage.current.files &&
        window.URL.createObjectURL(newSongArtistProfileImage.current.files[0]),
    });
  };
  const newSongGenreFunc = (e) => {
    e.preventDefault();
    setNewSong({
      ...newSong,
      Genre: newSongGenre.current.value.split(/(\s+)/),
    });
  };
  const newSongLyricsFunc = (e) => {
    e.preventDefault();
    setNewSong({
      ...newSong,
      Lyrics: newSongLyrics.current.value,
    });
  };
  const uploadSong = () => {
    SetLocalStorage('musicData', [...GetLocalStorage('musicData'), newSong]);
    setMusic(GetLocalStorage('musicData'));
    navigate('/all-songs');
  };
  return (
    <section className="Upload page">
      <div className="fileUploadContainer hasShadow">
        <div
          className="textHeading"
          style={{ color: ThemeData.primaryColorTwo }}
        >
          <h1>UPLOAD SONGS</h1>
          <p>upload songs to Damify Music even while you are offline</p>
        </div>
        <div
          style={{
            border: `dashed 3px ${ThemeData.depthColor}`,
          }}
          className="uploadContainer"
        >
          <UPLOAD size={40} color={ThemeData.brandColor} weight="duotone" />
          <p style={{ color: ThemeData.primaryColorTwo }}>
            Drag & Drop Your Songs Here
          </p>
          <p style={{ color: ThemeData.primaryColorTwo }}>Or</p>

          <Button
            event={() => uploadInput.current.click()}
            width="200px"
            height="40px"
            content="Browse Song"
          />
          <div style={{ width: '200px' }}>
            <p
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {newSong.MusicLink}
            </p>
          </div>
          <input
            ref={uploadInput}
            id="upload"
            style={{ display: 'none' }}
            type="file"
            accept="audio/*"
            onChange={({ target }) =>
              setNewSong({
                ...newSong,
                MusicLink:
                  target.files && window.URL.createObjectURL(target.files[0]),
              })
            }
          />
        </div>

        {newSong.MusicLink && !newSong.SongName && (
          <form
            onSubmit={newSongSongNameFormFunc}
            className="newSongInputContainer"
          >
            <input ref={newSongSongName} placeholder="Song Name" type="text" />
            <Button type="submit" flex=".5" height="40px" content="Submit" />
          </form>
        )}
        {newSong.MusicLink && newSong.SongName && !newSong.Artist && (
          <form
            onSubmit={newSongArtistFormFunc}
            className="newSongInputContainer"
          >
            <input ref={newSongArtist} placeholder="Artist Name" type="text" />
            <Button type="submit" flex=".5" height="40px" content="Submit" />
          </form>
        )}
        {newSong.MusicLink &&
          newSong.SongName &&
          newSong.Artist &&
          !newSong.MusicCoverImage && (
            <form
              onSubmit={newSongCoverImageFunc}
              className="newSongInputContainer"
            >
              <div style={{ flex: '2' }}>
                <p>Song Cover Image</p>
                <input
                  style={{ flex: '0', width: '100%' }}
                  ref={newSongMusicCoverImage}
                  type="file"
                  accept="image/*"
                />
              </div>
              <Button type="submit" flex=".5" height="40px" content="Submit" />
            </form>
          )}
        {newSong.MusicLink &&
          newSong.SongName &&
          newSong.Artist &&
          newSong.MusicCoverImage &&
          !newSong.ArtistProfileImage && (
            <form
              onSubmit={newSongArtistProfileImageFunc}
              className="newSongInputContainer"
            >
              <div style={{ flex: '2' }}>
                <p>Artist Picture</p>
                <input
                  style={{ flex: '0', width: '100%' }}
                  ref={newSongArtistProfileImage}
                  type="file"
                  accept="image/*"
                />
              </div>
              <Button type="submit" flex=".5" height="40px" content="Submit" />
            </form>
          )}
        {newSong.MusicLink &&
          newSong.SongName &&
          newSong.Artist &&
          newSong.MusicCoverImage &&
          newSong.ArtistProfileImage &&
          newSong.Genre.length === 0 && (
            <form onSubmit={newSongGenreFunc} className="newSongInputContainer">
              <input
                ref={newSongGenre}
                type="text"
                placeholder="Genre: eg Afro Beat, Rap, 9ja"
              />

              <Button type="submit" flex=".5" height="40px" content="Submit" />
            </form>
          )}
        {newSong.MusicLink &&
          newSong.SongName &&
          newSong.Artist &&
          newSong.MusicCoverImage &&
          newSong.ArtistProfileImage &&
          newSong.Genre.length &&
          !newSong.Lyrics && (
            <form
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                margin: '10px 0',
              }}
              onSubmit={newSongLyricsFunc}
              className="newSongInputContainer"
            >
              <textarea
                ref={newSongLyrics}
                placeholder="Paste Song Lyrics"
                cols="30"
                rows="10"
                style={{
                  outline: 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  width: '80%',
                  resize: 'none',
                }}
              ></textarea>

              <Button
                type="submit"
                width="90%"
                height="40px"
                content="Submit"
              />
            </form>
          )}
        {newSong.MusicLink &&
          newSong.SongName &&
          newSong.Artist &&
          newSong.MusicCoverImage &&
          newSong.ArtistProfileImage &&
          newSong.Genre.length &&
          newSong.Lyrics && (
            <Button
              event={uploadSong}
              type="button"
              width="90%"
              height="40px"
              content="upload Song 👌"
            />
          )}
      </div>
    </section>
  );
}
