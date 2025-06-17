import { useState } from 'react';
import type { IBooks } from '../../../@types/books';
import './ReviewModal.scss';
import api from '../../../utils/axiosApi';

type IReviewModalProps = {
  setDisplayReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentBook: IBooks | null | undefined;
  setReviewed: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReviewModal({
  setDisplayReviewModal,
  currentBook,
  setReviewed,
  setDisplayModalBook,
}: IReviewModalProps) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleReviewSubmit = async () => {
    if (!currentBook) return;
    try {
      console.log(currentBook);
      await api.post(`/book/${currentBook.id}/review`, {
        content: reviewText,
        rating,
      });
      setDisplayReviewModal(false);
      setReviewText('');
      setRating(0);
      setReviewed((prev) => !prev);
      setDisplayModalBook(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis :", error);
    }
  };

  return (
    <div className="hidden-background">
      <div
        className="library"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
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
          <button type="button" onClick={handleReviewSubmit}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
