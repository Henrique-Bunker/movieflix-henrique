import { UserReview } from './User'

export type MovieReview = {
  id: number
  text: string
  movieId: number
  user: UserReview
}
