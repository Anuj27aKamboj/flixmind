import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { TMDB_API_FUNCTION } from "../utils/constants";

const useTrailerVideo = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector(
    (store) => store.movies.trailerVideo
  );

  const fetchTrailer = async () => {
    const res = await fetch(
      `${TMDB_API_FUNCTION}/trailer?movieId=${movieId}`
    );
    const json = await res.json();

    const trailer =
      json.results?.find((v) => v.type === "Trailer") ||
      json.results?.[0];

    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    if (!trailerVideo && movieId) fetchTrailer();
  }, [movieId]);
};

export default useTrailerVideo;
