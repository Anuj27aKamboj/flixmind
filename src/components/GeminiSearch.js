import React from "react";
import GeminiMovieSuggestions from "./GeminiMovieSuggestions";
import GeminiSearchBar from "./GeminiSearchBar";

const GeminiSearch = () => {
  return (
    <div >
      <div className="fixed -z-10">
        <img src="./appBackground.jpg" alt="app-background" className="h-screen object-cover"/>
      </div>
      <GeminiSearchBar />
      <GeminiMovieSuggestions />
    </div>
  );
};

export default GeminiSearch;
