import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  return (
    <div className="min-w-[160px] hover:scale-125 transition-transform duration-300">
  <img
    src={IMG_CDN_URL + posterPath}
    alt="movie"
    className="rounded-md"
  />
</div>
  )
}

export default MovieCard