import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { QUERY_PROMPT } from "../utils/queryPrompt";
import { addGeminiMovieResult } from "../utils/geminiSlice";
import { TMDB_API_FUNCTION } from "../utils/constants";

const GeminiSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchTMDB = async (movie) => {
    const response = await fetch(
      `${TMDB_API_FUNCTION}/search?q=${encodeURIComponent(movie)}`,
    );
    if (!response.ok) throw new Error("TMDB search failed");
    const json = await response.json();
    return json.results;
  };

  const handleGeminiSearchClick = async () => {
    try {
      const response = await fetch(`${TMDB_API_FUNCTION}/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: QUERY_PROMPT + searchText.current.value,
        }),
      });

      const { text } = await response.json();
      const parsedResponse = JSON.parse(text);

      const tmdbResult = await Promise.all(
        parsedResponse.map((movieTitle) => searchTMDB(movieTitle)),
      );

      dispatch(
        addGeminiMovieResult({
          geminiMovieNames: parsedResponse,
          geminiMovieResults: tmdbResult,
        }),
      );
    } catch (err) {
      console.error("Gemini search failed:", err);
    }
  };

  return (
    <div className="absolute mt-[40%] md:mt-[10%] w-[90%] md:w-1/2 ml-5 md:ml-[25%]">
      <form
        className="bg-black bg-opacity-80 text-white py-4 px-2 rounded-md grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 rounded-md col-span-9 text-black"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="bg-yellow-500 rounded-md p-3 m-4 col-span-3"
          onClick={handleGeminiSearchClick}
        >
          <img
            alt="search-icon"
            src="./searchIcon.png"
            className="w-7 h-7 mx-auto"
          />
        </button>
      </form>
    </div>
  );
};

export default GeminiSearchBar;
