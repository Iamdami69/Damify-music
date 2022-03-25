import "./Authentication.css";
import React,{ useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import { Toast } from "../../Components/Toast/Toast";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { useUuid } from "../../Hooks/UseUuid/UseUuid";
import { HeadphoneSound, Avatar, EmailBlock, Lock } from "@icon-park/react";
import { UseLocalStorage } from "../../Hooks/UseLocalStorage/UseLocalStorage";
import { UserContext } from "../../Context/UserContext/UserContext";
import { UseRouteGuard } from "../../Hooks/UseRouteGuard/UseRouteGuard";
import { MusicData } from "../../Context/MusicContext/MusicData";
import { MusicContext } from "../../Context/MusicContext/MusicContext";
//APP LOGIC
export function Signup() {
  const { setMusic } = useContext(MusicContext);
  const { SetLocalStorage } = UseLocalStorage();
  const { id } = useUuid();
  const { user, setUser } = useContext(UserContext);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [message, setMessage] = useState(null);
  const { ThemeData } = useContext(ThemeContext);
  const [userData, setUserData] = useState({
    username: null,
    password: null,
    email: null,
    profilePicture: null,
    id,
    isLoggedIn: false
  });
  //SIGN UP EVENT
  const SignupFunc = (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.profilePicture
    ) {
      setMessage(
        `Hey ${
          userData.username ? userData.username : "stranger"
        } 👋 it seems you are trying to create  an account but you are still missing an input field. \n  To prevent this error from showing again. Please attend to all input field `
      );
    } else {
      setIsSigningUp(true);
      setUser(userData);
      SetLocalStorage("userData", userData);
      setMusic(MusicData);
    }
  };
  useEffect(() => {
    if (
      userData.username &&
      userData.email &&
      userData.password &&
      userData.profilePicture
    ) {
      setUserData((prevState) => ({ ...prevState, isLoggedIn: true }));
    } else {
      setUserData((prevState) => ({ ...prevState, isLoggedIn: true }));
    }
  }, [
    userData.username,
    userData.email,
    userData.password,
    userData.profilePicture
  ]);
  const okayErrorFunction = () => {
    setMessage(null);
    setIsSigningUp(false);
  };
  const { RouteGuard } = UseRouteGuard(user, "/");
  useEffect(() => {
    RouteGuard();
  }, [RouteGuard]);
  return (
    <section className="page signup">
      <div className="authenticationPageAppLogoContainer">
        <HeadphoneSound
          theme="two-tone"
          size="80"
          fill={[ThemeData.depthColor, ThemeData.brandColor]}
        />
        <h1 className="authenticationPageLogoTitle">Damify</h1>
      </div>
      <form
        className="authenticationForm"
        style={{
          border: `solid 2px ${ThemeData.depthColor}`,
          color: ThemeData.primaryColor
        }}
        autoComplete="off"
        onSubmit={SignupFunc}
      >
        <label
          className="authenticationPageInputContainer"
          style={{ borderBottom: `solid 2px ${ThemeData.depthColor}` }}
        >
          <Avatar
            theme="two-tone"
            size="35"
            fill={[ThemeData.depthColor, ThemeData.brandColor]}
          />
          <input
            autoComplete="false"
            name="hidden"
            style={{ color: ThemeData.primaryColor }}
            type="text"
            placeholder="username"
            className="authenticationPageInput"
            onInput={({ target }) =>
              setUserData({ ...userData, username: target.value })
            }
          />
        </label>
        <label
          className="authenticationPageInputContainer"
          style={{ borderBottom: `solid 2px ${ThemeData.depthColor}` }}
        >
          <EmailBlock
            theme="two-tone"
            size="35"
            fill={[ThemeData.depthColor, ThemeData.brandColor]}
          />
          <input
            autoComplete="false"
            name="hidden"
            style={{ color: ThemeData.primaryColor }}
            type="email"
            placeholder="Email"
            className="authenticationPageInput"
            onInput={({ target }) =>
              setUserData({ ...userData, email: target.value })
            }
          />
        </label>
        <label
          className="authenticationPageInputContainer"
          style={{ borderBottom: `solid 2px ${ThemeData.depthColor}` }}
        >
          <Lock
            theme="two-tone"
            size="35"
            fill={[ThemeData.depthColor, ThemeData.brandColor]}
          />
          <input
            autoComplete="false"
            name="hidden"
            style={{ borderBottom: `solid 2px ${ThemeData.depthColor}` }}
            type="password"
            placeholder="Password"
            className="authenticationPageInput"
            onInput={({ target }) =>
              setUserData({ ...userData, password: target.value })
            }
          />
        </label>

        <label>
          <input
            type="file"
            accept="image/*"
            className="authenticationPageFileInput"
            onChange={({ target }) =>
              setUserData({
                ...userData,
                profilePicture: window.URL.createObjectURL(target.files[0])
              })
            }
          />
        </label>
        <Button
          content={isSigningUp ? <p>Loading...</p> : <p>Signup</p>}
          width="100%"
          height="40px"
          type="submit"
          fontWeight="bold"
        />
        <p className="alreadyHaveAnAccountOrNot">
          Already have an account ?
          <Link
            to="/sign-in"
            style={{ color: ThemeData.brandColor, textDecoration: "none" }}
          >
            Sign In
          </Link>
        </p>
      </form>
      {message && (
        <Toast
          content={message}
          toastOkayEvent={okayErrorFunction}
          type="error"
          okayContent="Okay"
        />
      )}
    </section>
  );
}
