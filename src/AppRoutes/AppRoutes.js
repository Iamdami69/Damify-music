import React  from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "../Pages/Homepage/Homepage";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import { AllGenre } from "../Pages/AllGenre/AllGenre";
import { Signup } from "../Pages/Authentication/Signup";
import { Signin } from "../Pages/Authentication/Signin";
import { Genre } from "../Pages/Genre/Genre";
import { NowPlaying } from "../Pages/NowPlaying/NowPlaying";
import { Song } from "../Pages/Song/Song";
import { FourOFour } from "../Pages/404/FourOFour";
import { AllSongs } from "../Pages/AllSongs/AllSongs";
import { Upload } from "../Pages/Upload/Upload";

// App Logic
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/all-genre" element={<AllGenre />} />
        <Route path="/genre/:genreName" element={<Genre />} />
        <Route path="/all-songs" element={<AllSongs />} />
        <Route path="/all-songs/song/:songName" element={<Song />} />
        <Route path="song/nowPlaying/:nowPlaying" element={<NowPlaying />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/*" element={<FourOFour />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
