import React from "react";
import colors from "../../utils/colors";
import { defaultSongImage } from "../../utils/defaultImage";

function PlaylistImage({ songImages }) {
  const getImageSources = () => {
    if (songImages.length === 0) {
      return [defaultSongImage];
    } else if (songImages.length < 4) {
      return [songImages[0]];
    }
    return songImages.slice(0, 4);
  };

  const getGridProperties = (element, height, width) => {
    let grid =
      getImageSources().length === 1
        ? { rows: 1, cols: 1 }
        : { rows: 2, cols: 2 };

    let row = Math.floor(element / grid.cols);
    let col = element % grid.cols;

    let left = (col * width) / grid.cols;
    let top = (row * height) / grid.rows;

    console.log({
      position: "absolute",
      left,
      top,
      backgroundImage: `url(${getImageSources()[element]})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: height / grid.rows + "px",
      width: width / grid.cols + "px",
    });
    return {
      position: "absolute",
      left,
      top,
      backgroundImage: `url(${getImageSources()[element]})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: height / grid.rows + "px",
      width: width / grid.cols + "px",
    };
  };

  return (
    <div
      style={{
        aspectRatio: "1 / 1",
        height: "120px",
        overflow: "hidden",
        position: "relative",
        border: `1px solid ${colors.text}`,
      }}
    >
      {getImageSources().map((_, idx) => (
        <div key={idx} style={getGridProperties(idx, 120, 120)}></div>
      ))}
    </div>
  );
}

export default PlaylistImage;
