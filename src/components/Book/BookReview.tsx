import type { IBooks } from '../../@types/books';
import type { IUser } from '../../@types/user';
import api from '../../utils/axiosApi';
import './BookReview.scss';

interface IBookReviewProps {
  book: IBooks;
  user: IUser | undefined;
  setReviewed: React.Dispatch<React.SetStateAction<boolean>>;
}

function BookReview({ book, user, setReviewed }: IBookReviewProps) {
  //Delete review handler
  async function handleDeleteReview(reviewId: number) {
    try {
      await api.delete(`/review/${reviewId}`);
      setReviewed((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis :", error);
    }
  }

  return (
    <>
      {book.Reviews && book.Reviews.length > 0 && (
        <div className="book-reviews">
          <hr className="book-section-separator" />
          <h3 className="book-reviews-title">Avis des lecteurs :</h3>
          <ul className="book-reviews-list">
            {book.Reviews.map((review) => (
              <div key={review.id} className="book-reviews-list-review review">
                <li>
                  <p className="review-note">
                    <strong className="review-note-text">Note :</strong>{' '}
                    {review.rating} <span className="review-note-star">★</span>
                  </p>
                  <p>{review.content}</p>
                  <p className="review-meta">
                    Posté par <b>{review.User.firstname}</b>{' '}
                    <b>{review.User.name}</b> le{' '}
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </li>
                {review.User.id === user?.id && (
                  <button
                    type="button"
                    className="review-delete-button"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <img
                      src="../Pictures/tabler--trash.svg"
                      alt="Icon de poubelle cliquable pour supprimer le commentaire"
                    />
                  </button>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default BookReview;
