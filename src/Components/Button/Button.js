//CSS
import './Button.css';
//Hooks
import React ,{ useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
//Context
export function Button({
  content,
  width,
  height,
  event,
  type,
  fontSize = '16px',
  fontWeight = '500',
  className = 'primaryButton',
  flex,
}) {
  const { ThemeData } = useContext(ThemeContext);
  const buttonStyle = {
    flex,
    width,
    height,
    fontSize,
    fontWeight,
    backgroundImage:
      className === 'primaryButton'
        ? ` radial-gradient(
      100% 100% at 100% 0,
      ${ThemeData.brandColorTwo}0,
      ${ThemeData.brandColor} 100%)`
        : ` radial-gradient(
        100% 100% at 100% 0,
        ${ThemeData.depthColorTwo}0,
        ${ThemeData.depthColorTwo} 100%)`,
  };
  return (
    <button
      className={className}
      style={buttonStyle}
      onClick={event}
      type={type}
    >
      {content}
    </button>
  );
}
