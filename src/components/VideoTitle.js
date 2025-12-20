import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-10 flex items-center bg-gradient-to-r from-black/80 via-black/40 to-transparent">
      <div className="px-16 max-w-2xl">
        <h1 className="text-5xl text-gray-200 font-extrabold mb-4">
          {title}
        </h1>

        <p className="text-lg text-gray-200 mb-6 line-clamp-3">
          {overview}
        </p>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-white text-black rounded-md hover:bg-gray-200 transition">
            ▶ Play
          </button>

          <button className="flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-gray-500/40 text-white rounded-md hover:bg-gray-500/60 transition">
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  );
};


export default VideoTitle;
