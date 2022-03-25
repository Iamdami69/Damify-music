import "./Sidebar.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { UserContext } from "../../Context/UserContext/UserContext";
import { MusicContext } from "../../Context/MusicContext/MusicContext";
import {
  Sun,
  Moon,
  HeadphoneSound,
  PeopleDeleteOne,
  Delete,
  FolderMusic,
  MusicOne,
  FolderUpload
} from "@icon-park/react";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { MusicProgress } from "../MusicProgress/MusicProgress";
import { Toast } from "../Toast/Toast";
import { ImageHolder } from "../ImageHolder/ImageHolder";
import { PlayButton } from "../PlayButon/PlayButton";
import { MuteButton } from "../MuteButton/MuteButton";
import { IsFavoriteButton } from "../IsFavoriteButton/IsFavoriteButton";
// APP LOGIC
export function Sidebar() {
  const Navigate = useNavigate();
  const { ThemeData, isDark, setIsDark } = useContext(ThemeContext);
  const [message, setMessage] = useState({ message: null, type: null });
  const { user, setUser } = useContext(UserContext);
  const {
    setMusic,
    setCurrentlyPlaying,
    currentlyPlaying,
    audioReference,
    progress,
    setProgress
  } = useContext(MusicContext);
  const changeMode = () => {
    setIsDark(!isDark);
    localStorage.setItem("ThemeState", JSON.stringify(!isDark));
  };
  const confirmAccountDeleting = () => {
    setMessage({
      message: `Hey❗️ ${user.username}, are you sure you want to delete your account ?🤯. All data may be lost 🥺`,
      type: "error"
    });
  };
  const deleteUserAccount = () => {
    setUser(null);
    localStorage.clear();
    setMessage(null);
    audioReference.current.pause();
  };
  const confirmMusicDeleting = () => {
    setMessage({
      message: `Hey❗️ ${user.username}, are you sure you want to delete all songs in your playlist 😲, Confirming this action is going to delete all songs you have uploaded and the default songs also. \n \n However to restore default songs, delete your account and sign up again`,
      type: "warning"
    });
  };
  const deleteAllMusic = () => {
    audioReference.current.pause();
    audioReference.current.src = null;
    setProgress(0);
    setCurrentlyPlaying(null);
    setMessage(null);
    setMusic(null);
    localStorage.setItem("deleteAllMusic", JSON.stringify(true));
    localStorage.setItem("currentlyPlaying", null);
  };
  return (
    <section
      className={user ? "Sidebar" : "noneUserSideBar"}
      style={{
        borderRight: `solid 3px ${ThemeData.depthColor}`
      }}
    >
      {/**IF USER IS NOT SIGNED IN SIDEBAR SHOULD JUST GREET */}
      {!user && (
        <>
          <ToggleButton
            validator={isDark}
            event={changeMode}
            ifValidatorIsTrue={
              <>
                <Sun
                  theme="two-tone"
                  size="40"
                  fill={[ThemeData.depthColor, ThemeData.brandColor]}
                />
              </>
            }
            ifValidatorIsFalse={
              <>
                <Moon
                  theme="two-tone"
                  size="40"
                  fill={[ThemeData.depthColor, ThemeData.brandColor]}
                />
              </>
            }
          />
          <h1 className="greetingUser">Welcome To Damify Music</h1>
        </>
      )}
      {user && (
        <>
          <div className="userSidebarOne">
            <Link to="/">
              <HeadphoneSound
                theme="two-tone"
                size="60"
                fill={[ThemeData.depthColor, ThemeData.brandColor]}
              />
            </Link>
            <ToggleButton
              validator={isDark}
              event={changeMode}
              ifValidatorIsTrue={
                <Sun
                  theme="two-tone"
                  size="40"
                  fill={[ThemeData.depthColor, ThemeData.brandColor]}
                />
              }
              ifValidatorIsFalse={
                <Moon
                  theme="two-tone"
                  size="40"
                  fill={[ThemeData.depthColor, ThemeData.brandColor]}
                />
              }
            />
            <Link to="/all-songs">
              <FolderMusic
                theme="two-tone"
                size="30"
                fill={[ThemeData.depthColor, ThemeData.brandColor]}
              />
            </Link>

            <Link to="/all-genre">
              <MusicOne
                theme="two-tone"
                size="30"
                fill={[ThemeData.depthColor, ThemeData.brandColor]}
              />
            </Link>
            <Link to="/upload">
              <FolderUpload
                theme="two-tone"
                size="30"
                fill={[ThemeData.depthColor, ThemeData.brandColor]}
              />
            </Link>
            <Delete
              theme="two-tone"
              size="40"
              fill={[ThemeData.depthColor, ThemeData.brandColor]}
              onClick={confirmMusicDeleting}
            />
            <PeopleDeleteOne
              theme="two-tone"
              size="40"
              fill={[ThemeData.depthColor, ThemeData.brandColor]}
              onClick={confirmAccountDeleting}
            />
          </div>
          <div className="userSidebarTwo">
            <MusicProgress
              parentStyle={{ margin: " 0 auto" }}
              trackClassName="progressContainer"
              trackWidth="10px"
              trackHeight="40%"
              trackIndicatorClassName="progressIndicator"
              trackIndicatorWidth="100%"
              trackIndicatorHeightSource={progress}
            />
            <MuteButton />
            <PlayButton />
            <IsFavoriteButton />
            <ImageHolder
              event={() =>
                Navigate(
                  `/song/nowPlaying/:${
                    currentlyPlaying
                      ? currentlyPlaying.SongName
                      : "No Current Song"
                  }`
                )
              }
              borderRadius="10px"
              hasMargin={false}
              imageClassName={
                audioReference.current.paused
                  ? " hasShadow touchableOpacity sidebarCurrentlyPlayingImage"
                  : "hasRotatingBackground hasShadow touchableOpacity sidebarCurrentlyPlayingImage"
              }
              imageSource={currentlyPlaying && currentlyPlaying.MusicCoverImage}
            />
            <ImageHolder
              event={null}
              borderRadius="10px"
              hasMargin={false}
              imageClassName={null}
              imageSource={null}
            />
          </div>
        </>
      )}
      {message && message.type === "error" && (
        <Toast
          isInOneLine={true}
          type="danger"
          content={message.message}
          okayContent="Delete Account"
          cancelContent="Cancel"
          toastCancelEvent={() => setMessage(null)}
          toastOkayEvent={deleteUserAccount}
        />
      )}
      {message && message.type === "warning" && (
        <Toast
          isInOneLine={true}
          type="warning"
          content={message.message}
          okayContent="Yes! Delete All"
          cancelContent="Cancel"
          toastCancelEvent={() => setMessage(null)}
          toastOkayEvent={deleteAllMusic}
        />
      )}
    </section>
  );
}
