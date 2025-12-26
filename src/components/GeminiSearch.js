import React from "react";
import GeminiMovieSuggestions from "./GeminiMovieSuggestions";
import GeminiSearchBar from "./GeminiSearchBar";

const GeminiSearch = () => {
  return (
    <div >
      <div className="fixed -z-10 h-full">
        <img src="./appBackground.jpg" alt="app-background" />
      </div>
      <GeminiSearchBar />
      <GeminiMovieSuggestions />
    </div>
  );
};

export default GeminiSearch;
