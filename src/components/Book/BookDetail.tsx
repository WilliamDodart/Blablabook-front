import type { IBooks } from '../../@types/books';
import './BookDetail.scss';

interface IBookDetailProps {
  book: IBooks;
}

function BookDetail({ book }: IBookDetailProps) {
  return (
    <div className="book-detail">
      <div className="book-detail-image">
        <img src={`${book.image}`} alt={`${book.title}`} />
      </div>
      <div className="book-detail-text">
        <div>
          <p>
            <b>Auteur :</b> {book.author}
          </p>
          <p>
            <b>Parution :</b> {book.publication_year}
          </p>
          <p>
            <b>Édition :</b> {book.editor}
          </p>
          <p>
            <b>ISBN :</b> {book.isbn}
          </p>
          <p>
            <b>Pages :</b> {book.pages}
          </p>
          <p>
            <b>Genres :</b> {book.Genres[0].name}
            {book.Genres[1] && ` - ${book.Genres[1].name}`}
          </p>

          {book.Reviews && book.Reviews.length > 0 && (
            <p className="book-detail-text-note">
              <b className="book-detail-text-note-field">Note moyenne :</b>
              {(
                book.Reviews.reduce((sum, review) => sum + review.rating, 0) /
                book.Reviews.length
              ).toFixed(1)}
              <span className="book-detail-text-note-star">★</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
