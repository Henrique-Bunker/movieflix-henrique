import './styles.css'
import StarImage from 'assets/images/star-icon.png'
import { MovieReview } from 'types/MovieReview'

interface Props {
  reviewData: MovieReview
}

const CardReview = (props: Props) => {
  const { reviewData } = props
  return (
    <div className="card-review-container">
      <div className="author-container">
        <img src={StarImage} alt="Star" />
        <h4>{reviewData.user.name}</h4>
      </div>
      <div className="review-container">
        <p>{reviewData.text}</p>
      </div>
    </div>
  )
}

export default CardReview
