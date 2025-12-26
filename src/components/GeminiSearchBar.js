import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import client from "../utils/genai";
import { QUERY_PROMPT } from "../utils/queryPrompt";
import { API_OPTIONS } from "../utils/constants";
import { addGeminiMovieResult } from "../utils/geminiSlice";

const GeminiSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchGeminiAPI = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGeminiSearchClick = async () => {
    console.log(searchText.current.value);
    //   const response = await genAI.models.list();
    //   console.log(response);

    const geminiAPIResponse = await client.models.generateContent({
      model: "models/gemini-flash-lite-latest",
      contents: [
        {
          role: "user",
          parts: [{ text: QUERY_PROMPT + searchText.current.value }],
        },
      ],
    });

    const parsedResponse = JSON.parse(geminiAPIResponse.text);

    console.log(parsedResponse);

    const searchAPIData = parsedResponse.map((movieTitle) =>
      searchGeminiAPI(movieTitle)
    );

    const tmdbResult = await Promise.all(searchAPIData);

    console.log(tmdbResult);

    // const filtereTMDBResults = tmdbResult.map((results, index) =>
    //   results.filter(
    //     (movie) =>
    //       movie.title.trim().toLowerCase() ===
    //       parsedResponse[index].trim().toLowerCase()
    //   )
    // );

    // console.log(filtereTMDBResults);

    dispatch(
      addGeminiMovieResult({
        geminiMovieNames: parsedResponse,
        geminiMovieResults: tmdbResult,
      })
    );
  };

  return (
    <div className="absolute mt-[10%] w-1/2 z-10 ml-[25%]">
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
