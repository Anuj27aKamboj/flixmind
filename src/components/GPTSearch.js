import React from "react";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearch = () => {
  return (
    <div >
      <div className="absolute -z-10">
        <img src="./appBackground.jpg" alt="app-background" />
      </div>
      <GPTMovieSuggestions />
      <GPTSearchBar />
    </div>
  );
};

export default GPTSearch;
