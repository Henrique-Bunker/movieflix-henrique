import { AxiosRequestConfig } from 'axios'
import MovieFilter from 'components/MovieFilter'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Movie } from 'types/Movie'
import { requestBackend } from 'utils/requests'
import MovieListCard from './MovieListCard'
import './styles.css'
const Movies = () => {
  const [moviesList, setMoviesList] = useState<Movie[]>([])

  const getMovies = useCallback(async () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: 0,
        size: 4,
      },
    }

    try {
      const result = await requestBackend(params)
      setMoviesList(result.data.content)
    } catch (error) {
      console.log('ERRO')
    }
  }, [])

  useEffect(() => {
    getMovies()
  }, [getMovies])

  return (
    <div className="container movies-container">
      <div className="row movies-row-container">
        <div className="col-12 px-lg-4 px-xl-2">
          <MovieFilter />
        </div>
      </div>
      <div className="row movies-row-container">
        {moviesList.map((movie) => (
          <div
            className="col-sm-6 col-xl-3 px-lg-4 px-xl-2 mb-4 mb-lg-5 movies-card-container"
            key={movie.id}
          >
            <MovieListCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Movies
