import { Link } from 'react-router';
import type { IUser } from '../../@types/user';
import api from '../../utils/axiosApi';
import './Reviews.scss'

interface IReviewsProps {
  user?: IUser;
  setReviewed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Reviews({ user, setReviewed }: IReviewsProps) {
  //API Call
  const handleDeleteReview = async (reviewId: number) => {
    try {
      await api.delete(`/review/${reviewId}`);
      setReviewed((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis :", error);
    }
  };

  return (
    <div className="profile-reviews">
      <p className="profile-reviews-title">
        Mes avis ({user?.Reviews.length})
      </p>
      {user?.Reviews && user.Reviews.length > 0 && (
        <div className="profile-reviews-container">
          <ul>
            {user.Reviews.map((review) => (
              <li
                key={review.id}
                className="one-review"
              >
                <Link to={`/book/${review.Book.id}`}>
                  <div className="one-review-cover">
                    <img src={review.Book.image} alt="Couverture du livre contenant le commentaire" />
                  </div>
                </Link>

                <div className="one-review-text-container">
                  <p>
                    <strong>{review.Book.title}</strong>
                  </p>
                  <p className="author">{review.Book.author}</p>
                  <p className="note">
                    <strong className="note-text">Note :</strong>{' '}
                    {review.rating} <span className="star">★</span>
                  </p>
                  <p>{review.content}</p>
                  <p className="review-meta">
                    Posté le {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    type="button"
                    className="reviews-delete-button"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <img
                      src="../Pictures/tabler--trash.svg"
                      alt="Icone de suppression en forme de poubelle"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Reviews;
