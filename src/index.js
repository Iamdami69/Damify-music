import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ThemeContextProvider } from "./Context/ThemeContext/ThemeContext";
import { UserContextProvider } from "./Context/UserContext/UserContext";
import { MusicContextProvider } from "./Context/MusicContext/MusicContext";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <UserContextProvider>
      <ThemeContextProvider>
        <MusicContextProvider>
          <App />
        </MusicContextProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  </StrictMode>,
  rootElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
