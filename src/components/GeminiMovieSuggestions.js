import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GeminiMovieSuggestions = () => {
  const {geminiMovieNames, geminiMovieResults} = useSelector(store => store.gemini);

  if(!geminiMovieNames) return null;

  // Add shimmer UI

  return (
    <div className='absolute mt-[70%] md:mt-[20%] w-[90%] md:w-1/2 ml-5 md:ml-[25%] z-10 text-white bg-black bg-opacity-75 rounded-md p-6 mx-auto items-center'>
      {geminiMovieNames.map((movieName,index)=> <MovieList key={movieName} title={movieName} movies={geminiMovieResults[index]}/>)}
    </div>
  )
}

export default GeminiMovieSuggestions