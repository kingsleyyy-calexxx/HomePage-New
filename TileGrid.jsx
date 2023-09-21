import React from "react";
import "../Styles/TileGrid.css";
import { Link } from "react-router-dom";

const TileGrid = ({ images }) => {
  return (
    <div className="tile-grid">
        <nav>
      {images.map((imageSrc, index) => (
        <div key={index} className="tile">
          {/* <Link to={`/image/${index}`}></Link> */}
            <img src={imageSrc} alt={`Tile ${index}`} className="tile-image" />
        </div>
      ))}
        </nav>
    </div>
  );
};

export default TileGrid;
