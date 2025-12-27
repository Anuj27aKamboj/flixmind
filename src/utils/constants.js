export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+process.env.REACT_APP_TMDB_TOKEN
  }
};

export const NOW_PLAYING_MOVIES_API = "https://api.themoviedb.org/3/movie/now_playing?page=1";

export const POPULAR_MOVIES_API = "https://api.themoviedb.org/3/movie/popular?page=1";

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w200/";

export const SUPPORRTED_LANGUAGES = [{identifier:"en", name:"English"},
  {identifier:"hi", name:"Hindi"},
  {identifier:"es", name:"Spanish"},
  {identifier:"de", name:"German"},
]


