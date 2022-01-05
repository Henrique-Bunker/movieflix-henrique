import { Link } from 'react-router-dom'
import './styles.css'
const Movies = () => {
  return (
    <div className="movies-container">
      <div className="title-container mb-4">
        <h1>Tela listagem de filmes</h1>
      </div>
      <ul className="list-group">
        <li className="mb-2">
          <Link to="/movies/1">Acessar /movies/1</Link>
        </li>
        <li className="mb-2">
          <Link to="/movies/2">Acessar /movies/2</Link>
        </li>
      </ul>
    </div>
  )
}
export default Movies
