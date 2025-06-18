import { Link } from 'react-router';
import type { IBooks } from '../../@types/books';
import './BookSummary.scss';

interface IBookSummaryProps {
  book: IBooks;
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
}

function BookSummary({
  book,
  setDisplayModalBook,
  setCurrentBook,
}: IBookSummaryProps) {
  function handleClick() {
    setCurrentBook(book);
    setDisplayModalBook(true);
  }
  return (
    <div className="book-summary">
      <hr className="book-section-separator" />
      <h3 className="book-summary-title">Résumé:</h3>
      <p className="book-summary-resume">{book.summary}</p>

      <button
        type="button"
        className="book-summary-button"
        onClick={handleClick}
      >
        <Link to="" className="book-summary-button-link">
          <img
            src="../Pictures/ic--outline-plus.png"
            className="book-summary-button-link-icon"
            alt="Icone cliquable en forme de '+' pour ajouter le livre à sa bibliothèque"
          />
        </Link>
      </button>
    </div>
  );
}

export default BookSummary;
