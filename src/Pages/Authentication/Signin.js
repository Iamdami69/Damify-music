import "./Authentication.css";
import React,{ useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Toast } from "../../Components/Toast/Toast";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { HeadphoneSound, Avatar, Lock } from "@icon-park/react";
import { Button } from "../../Components/Button/Button";

// APP LOGIC
export function Signin() {
  const { ThemeData } = useContext(ThemeContext);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [message, setMessage] = useState(null);

  const [userData, setUserData] = useState({
    username: null,
    password: null,
    isLoggedIn: false
  });

  //SIGN UP EVENT
  const SignupFunc = (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    alert(JSON.stringify(userData, null, 4));
  };

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
          style={{ borderBottom: `solid 3px ${ThemeData.depthColor}` }}
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
          <Lock
            theme="two-tone"
            size="35"
            fill={[ThemeData.depthColor, ThemeData.brandColor]}
          />
          <input
            autoComplete="false"
            name="hidden"
            style={{ color: ThemeData.primaryColor }}
            type="password"
            placeholder="Password"
            className="authenticationPageInput"
            onInput={({ target }) =>
              setUserData({ ...userData, password: target.value })
            }
          />
        </label>
        <Button
          width="100%"
          content={isSigningUp ? <p>Loading...</p> : <p>Signin</p>}
          height="40px"
          type="submit"
        />
        <p className="alreadyHaveAnAccountOrNot">
          New to Damify Music ?
          <Link
            to="/sign-up"
            style={{ color: ThemeData.brandColor, textDecoration: "none" }}
          >
            Sign Up
          </Link>
        </p>
      </form>
      {message && (
        <Toast content={message} toastCloseEvent={() => setMessage(false)} />
      )}
    </section>
  );
}
