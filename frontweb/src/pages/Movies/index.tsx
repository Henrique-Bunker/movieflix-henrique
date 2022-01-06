import { AxiosRequestConfig } from 'axios'
import MovieFilter, { ProductFilterData } from 'components/MovieFilter'
import Pagination from 'components/Pagination'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Movie } from 'types/Movie'
import { SpringPage } from 'types/vendor/spring'
import { requestBackend } from 'utils/requests'
import MovieListCard from './MovieListCard'
import './styles.css'

type ControlComponentsData = {
  activePage: number
  filterData: ProductFilterData
}

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>()
  const [moviesList, setMoviesList] = useState<Movie[]>([])
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    })

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    })
  }

  const handleSubmitFilter = (data: ProductFilterData) => {
    setControlComponentsData({
      activePage: 0,
      filterData: data,
    })
  }

  const getMovies = useCallback(async () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    }

    try {
      const result = await requestBackend(params)
      setMoviesList(result.data.content)
      setPage(result.data)
    } catch (error) {
      console.log('ERRO')
    }
  }, [controlComponentsData])

  useEffect(() => {
    getMovies()
  }, [getMovies])

  return (
    <div className="container movies-container">
      <div className="row movies-row-container">
        <div className="col-12 px-lg-4 px-xl-2">
          <MovieFilter onSubmitFilter={handleSubmitFilter} />
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
      <div className="row movies-row-container">
        <div className="col-12">
          <Pagination
            forcePage={page?.number}
            pageCount={page ? page.totalPages : 0}
            range={4}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}
export default Movies
