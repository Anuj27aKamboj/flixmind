import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="min-w-[160px] transform-gpu transition-transform duration-300 ease-out hover:scale-110 cursor-pointer">
      <img src={IMG_CDN_URL + posterPath} alt="movie" className="rounded-md h-64" />
    </div>
  );
};

export default MovieCard;
