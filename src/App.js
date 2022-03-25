import "./App.css";
import React, { useContext } from "react";
import { ThemeContext } from "./Context/ThemeContext/ThemeContext";
import { AppRoutes } from "./AppRoutes/AppRoutes";

export default function App() {
  const { ThemeData } = useContext(ThemeContext);
  const AppStyle = {
    backgroundColor: ThemeData.primaryBackground,
    color: ThemeData.primaryColor
  };
  return (
    <div className="App" style={AppStyle}>
      <AppRoutes />
    </div>
  );
}
