import { AxiosRequestConfig } from 'axios'
import CardReview from 'components/CardReview'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { MovieReview } from 'types/MovieReview'
import { hasAnyRoles } from 'utils/auth'
import { requestBackend } from 'utils/requests'
import './styles.css'

type UrlParams = {
  movieId: string
}

type FormData = {
  review: string
}

type FormReview = {
  text: string
  movieId: string
}

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>()
  const [movieReviews, setMovieReviews] = useState<MovieReview[]>()
  const [review, setReview] = useState<string>()
  const [hasError, setHasError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const handleReviewText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value)
  }

  const handleSubmitReview = async () => {
    const data = {
      text: review!,
      movieId: movieId,
    } as FormReview

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      withCredentials: true,
      data,
    }

    try {
      const loginRequest = await requestBackend(params)
      const buildReviews: MovieReview = loginRequest.data
      const newReviews = movieReviews

      newReviews?.push(buildReviews)
      setMovieReviews(newReviews)

      setHasError(false)
    } catch (error) {
      setHasError(true)
    }
  }

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    }

    requestBackend(params).then((response) => {
      setMovieReviews(response.data)
    })
  }, [movieId])

  return (
    <div className="movie-details-container">
      <div className="title-container mb-4">
        <h1>Tela detalhes do filme id: {movieId}</h1>
      </div>
      {hasAnyRoles(['ROLE_MEMBER']) && (
        <div className="post-review-container">
          <form
            onSubmit={handleSubmit(handleSubmitReview)}
            className="form-review"
          >
            <div className="mb-2">
              <textarea
                {...register('review', {
                  required: 'Campo obrigatorio',
                })}
                className={`form-control base-input ${
                  errors.review ? 'is-invalid' : ''
                }`}
                name="review"
                value={review}
                placeholder="Deixe sua avaliação aqui"
                onChange={handleReviewText}
              ></textarea>
            </div>
            {hasError && (
              <div className="alert alert-danger">
                Erro ao tentar efetuar o login
              </div>
            )}
            <div className="invalid-feedback d-block">
              {errors.review?.message}
            </div>
            <div className="review-submit">
              <button className="btn btn-primary">Salvar avaliação</button>
            </div>
          </form>
        </div>
      )}

      <div className="list-review-container">
        <ul>
          {movieReviews &&
            movieReviews.map((review) => (
              <li key={review.id}>
                <CardReview reviewData={review} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default MovieDetails
