import { useState } from 'react';
import type { IBooks, IReviewError } from '../../../@types/books';
import './ReviewModal.scss';
import api from '../../../utils/axiosApi';
import axios from 'axios';
import { successToast } from '../../../utils/toast';

type IReviewModalProps = {
  currentBook: IBooks | null | undefined;
  setDisplayReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewed: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReviewModal({
  currentBook,
  setDisplayReviewModal,
  setReviewed,
  setDisplayModalBook,
}: IReviewModalProps) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [errors, setErrors] = useState({ review: '' });

  const handleReviewSubmit = async () => {
    try {
      await api.post(`/book/${currentBook?.id}/review`, {
        content: reviewText,
        rating,
      });

      setDisplayReviewModal(false);
      setReviewText('');
      setRating(0);
      setReviewed((prev) => !prev);
      setDisplayModalBook(false);
      successToast('Note et commentaire ajoutés !');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IReviewError = { review: '' };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IReviewError] = error.message;
        }
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="hidden-background">
      <div
        className="library"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setDisplayReviewModal(false)}
          className="library-closeBtn"
        >
          <img src="../Pictures/gridicons--cross.svg" alt="close-button" />
        </button>
        <div className="review-form">
          <h1> Note :</h1>
          <div className="star-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`star ${(hoverRating ?? rating) >= star ? 'filled' : ''}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => setRating(star)}
                  aria-label={`Donner une note de ${star} sur 5`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <label htmlFor="review">Votre avis :</label>
          <textarea
            id="review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          {errors.review && (
            <p className="review-form-error">{errors.review}</p>
          )}
          <button type="button" onClick={handleReviewSubmit}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
