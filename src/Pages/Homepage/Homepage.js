import './Homepage.css';
import React, { useContext, useEffect, useState } from 'react';
import { MusicContext } from '../../Context/MusicContext/MusicContext';
import { UserContext } from '../../Context/UserContext/UserContext';
import { Header } from '../../Components/Header/Header';
import { UseRouteGuard } from '../../Hooks/UseRouteGuard/UseRouteGuard';
import { Toast } from '../../Components/Toast/Toast';
import { RecentlyUploaded } from '../../Components/RecentlyUploaded/RecentlyUploaded';
import { Genres } from '../../Components/Genres/Genres';
import { FavouriteSong } from '../../Components/FavoriteSong/FavoriteSong';
import { RecentArtist } from '../../Components/RecentArtist/RecentArtist';

// APP LOGIC
export function Homepage() {
  const { user } = useContext(UserContext);
  const { music } = useContext(MusicContext);
  const { RouteGuard } = UseRouteGuard(!user, '/sign-up');
  const [message, setMessage] = useState(null);
  useEffect(() => {
    RouteGuard();
  }, [RouteGuard]);
  useEffect(() => {
    if (!music) {
      setMessage(
        `Hey ${
          user && user.username
        }👋, Welcome to Damify Music ⚡️🎵, to Start Listening to music , upload songs to start Listening  to your favourite  music😉`
      );
    }
  }, []);

  return (
    <section className="homepage page">
      {message && (
        <Toast
          content={message}
          cancelContent="Close"
          type="message"
          toastCancelEvent={() => setMessage(null)}
        />
      )}
      <Header />
      <RecentlyUploaded />
      <div className="contentContainer">
        <Genres />
        <FavouriteSong />
        <RecentArtist />
      </div>
    </section>
  );
}
