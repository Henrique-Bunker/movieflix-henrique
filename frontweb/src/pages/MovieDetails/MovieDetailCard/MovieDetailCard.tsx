import { Movie } from 'types/Movie'
import './styles.css'

type Props = {
  movie: Movie
}

const MovieDetailsCard = ({ movie }: Props) => {
  return (
    <div className="movie-detail-card-container">
      <div className="movie-detail-card-thumb-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-detail-card-content-container">
        <h3>{movie.title}</h3>
        <h4>{movie.year}</h4>
        <p className="movie-detail-card-subtitle">{movie.subTitle}</p>
        <p className="movie-detail-card-synopsis">{movie.synopsis}</p>
      </div>
    </div>
  )
}
export default MovieDetailsCard
