import React from "react";

const FlagAvatar = ({ countryCode, countryName, size = 38, ...rest }) => {
  let imageSize = 64;

  let mySize = size;

  if (isNaN(size) || size <= 1) mySize = 38;

  if (size >= 24 && size < 32) imageSize = 48;
  if (size >= 16 && size < 24) imageSize = 32;
  if (size >= 8 && size < 16) imageSize = 24;
  if (size >= 2 && size < 8) imageSize = 16;

  const styles = {
    width: mySize,
    height: mySize,
    display: "flex",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    flexShrink: 0,
    userSelect: "none",
    borderRadius: "50%",
    justifyContent: "center"
  };
  return (
    <div style={styles}>
      <img
        alt={countryName}
        src={`https://www.countryflags.io/${countryCode}/shiny/${imageSize}.png`}
      />
    </div>
  );
};

export default FlagAvatar;
