import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useTrailerVideo(movieId);

  if (!trailerVideo || !trailerVideo.key) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-10">
      <iframe
        className="w-full h-full scale-125"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${trailerVideo.key}`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
};



export default VideoBackground;
