import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { TMDB_API_FUNCTION } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(
    (store) => store.movies.popularMovies
  );

  const fetchPopular = async () => {
    const res = await fetch(`${TMDB_API_FUNCTION}/popular`);
    const json = await res.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    if (!popularMovies) fetchPopular();
  }, []);
};

export default usePopularMovies;
