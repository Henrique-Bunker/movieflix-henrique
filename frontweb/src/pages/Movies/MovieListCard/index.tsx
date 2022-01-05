import { Movie } from 'types/Movie'
import './styles.css'

type Props = {
  movie: Movie
}

const MovieListCard = ({ movie }: Props) => {
  return (
    <div className="movie-list-card-container">
      <div className="movie-list-card-thumb-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-list-card-content-container">
        <h3>{movie.title}</h3>
        <h4>{movie.year}</h4>
        <p>{movie.subTitle}</p>
      </div>
    </div>
  )
}

export default MovieListCard
