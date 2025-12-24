export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTQwZTVhYTQ3ZGIxMDc3MWQ4OTBjYzVjYmI2YWQ0YiIsIm5iZiI6MTc2NTk2MTM0My42OTUwMDAyLCJzdWIiOiI2OTQyNmU3ZmRmMjQwNzdiZjVlODEwMjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1Y11Rk60EQbxKdS9zQO1GPaYnG1Y2uThaHfI-bcCCwU'
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

