import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { TMDB_API_FUNCTION } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const fetchNowPlaying = async () => {
    const res = await fetch(`${TMDB_API_FUNCTION}/now-playing`);
    const json = await res.json();
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    if (!nowPlayingMovies) fetchNowPlaying();
  }, []);
};

export default useNowPlayingMovies;
