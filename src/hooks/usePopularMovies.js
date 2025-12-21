import { POPULAR_MOVIES_API, API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getAPIData = async () => {
    const data = await fetch(POPULAR_MOVIES_API, API_OPTIONS);
    const json = await data.json();
    // console.log(json.results);

    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    getAPIData();
  }, []);
}

export default usePopularMovies;