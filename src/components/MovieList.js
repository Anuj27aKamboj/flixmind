import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // if (!movies || movies.length === 0) return null;
  // console.log(movies);
  return (
    <div className="relative z-10 p-10 pt-0 mb-5 text-white">
      <h2 className="text-xl font-bold mb-1">{title}</h2>
      <div className="flex gap-3 overflow-x-scroll scrollbar-hide py-8">
        {movies?.map((movie) => (
          <MovieCard key={movie?.id} posterPath={movie?.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
