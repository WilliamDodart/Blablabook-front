import './Book.scss';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import type { IBooks } from '../../@types/books';
import type { IUser } from '../../@types/user';
import BookDetail from '../../components/Book/BookDetail';
import BookReview from '../../components/Book/BookReview';
import BookSummary from '../../components/Book/BookSummary';
import api from '../../utils/axiosApi';

interface BookProps {
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewed: React.Dispatch<React.SetStateAction<boolean>>;
  reviewed: boolean;
  user: IUser | undefined;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
}

function Book({
  setDisplayModalBook,
  setReviewed,
  reviewed,
  user,
  setCurrentBook,
}: BookProps) {
  const { id } = useParams();

  const [book, setBook] = useState<IBooks | null>(null);

  //API Call
  const fetchBook = useCallback(async () => {
    try {
      const { data } = await api.get(`/book/${id}`);
      setBook(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du livre :', error);
    }
  }, [id]);

  useEffect(() => {
    if (reviewed !== undefined) fetchBook();
  }, [fetchBook, reviewed]);

  //In case of unexpected error
  if (!book) return <p>Chargement...</p>;

  return (
    <section className="book-section">
      <div className="book-section-detail">
        <Link to="/books">
          <img
            className="book-section-detail-arrow"
            src="../Pictures/humbleicons--arrow-left.png"
            alt="flèche de retour en arrière"
          />
        </Link>
        <h2 className="book-section-detail-title">{book.title}</h2>

        <BookDetail book={book} />

        <BookSummary
          book={book}
          setDisplayModalBook={setDisplayModalBook}
          setCurrentBook={setCurrentBook}
        />

        <BookReview book={book} user={user} setReviewed={setReviewed} />
      </div>
    </section>
  );
}

export default Book;
