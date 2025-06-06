import { Link } from 'react-router';
import type { IBooks } from '../../@types/books';
import './BookCard.scss';

interface IBookCardProps {
  book: IBooks;
  index: number;
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
}

function BookCard({
  book,
  index,
  setDisplayModalBook,
  setCurrentBook,
}: IBookCardProps) {
  return (
    <li className="books-card">
      <Link
        to={`/book/${book.id}`}
        className="books-card-link"
        style={{
          animationDelay: `${index * 70}ms`,
        }}
        onClick={() => {
          setCurrentBook(book);
        }}
      >
        <figure className="books-card-container">
          <div className="books-card-container-cover">
            <img
              className="books-card-container-cover-image"
              src={book.image}
              alt="Couverture du livre"
            />
            <button
              className="books-card-container-cover-button"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setCurrentBook(book);
                setDisplayModalBook(true);
              }}
            >
              ...
            </button>
          </div>
          <hgroup className="books-card-container-infos">
            <figcaption className="books-card-container-infos-title">
              {book.title}
            </figcaption>
            <h5 className="books-card-container-infos-author">{book.author}</h5>
          </hgroup>
        </figure>
      </Link>
    </li>
  );
}

export default BookCard;
