import React ,{ useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { Search } from "@icon-park/react";
import "./Header.css";
import { UserContext } from "../../Context/UserContext/UserContext";
import { ImageHolder } from "../ImageHolder/ImageHolder";

export function Header() {
  const { ThemeData } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const [searchValues, setSearchValues] = useState(null);
  const searchResult = (e) => {
    e.preventDefault();
    alert(`I'll search for ${searchValues}`);
  };
  return (
    <header style={{ background: ThemeData.primaryBackground }}>
      <form
        style={{ border: `solid 2px ${ThemeData.depthColor}` }}
        onSubmit={searchResult}
      >
        <input
          style={{ color: ThemeData.primaryColor }}
          type="text"
          onInput={(e) => setSearchValues(e.target.value)}
          placeholder="Search for artist,tract or lyrics"
        />
        <Search
          onClick={searchResult}
          theme="two-tone"
          size="40"
          fill={[ThemeData.depthColor, ThemeData.brandColor]}
        />
      </form>

      <ImageHolder
        hasMargin={true}
        width="50px"
        borderRadius="50%"
        imageClassName={
          user ? ` touchableOpacity` : `touchableOpacity isLoading`
        }
        imageSource={user ? user.profilePicture : "none"}
      />
    </header>
  );
}
