import { Link } from 'react-router';
import type { IBooks } from '../../@types/books';

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
    <li className="books-list-li">
      <Link
        to={`/book/${book.id}`}
        className="animated-book"
        style={{
          animationDelay: `${index * 70}ms`,
        }}
        onClick={() => {
          setCurrentBook(book);
        }}
      >
        <figure>
          <div id="book-img">
            <img src={book.image} alt="book-image" />
            <button
              className="test-btn"
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
          <hgroup>
            <figcaption>{book.title}</figcaption>
            <h5>{book.author}</h5>
          </hgroup>
        </figure>
      </Link>
    </li>
  );
}

export default BookCard;
