import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-10 flex items-center bg-gradient-to-r from-black/90 via-black/50 to-transparent">
      <div className="px-6 -mt-16 md:px-16 max-w-2xl">
        <h1 className="text-2xl md:text-5xl font-bold md:font-extrabold text-white mb-4">{title}</h1>

        <p className="text-sm md:text-lg text-gray-200 mb-6 line-clamp-1 md:line-clamp-3">{overview}</p>

        <div className="flex justify-between md:justify-normal gap-4">
          <button className="px-3 py-1 md:px-6 md:py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
            ▶ Play
          </button>

          <button className="px-3 py-1 md:px-6 md:py-3 bg-gray-600/60 text-white font-semibold rounded hover:bg-gray-600 transition">
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
