import { Link } from 'react-router';
import './CoverBook.scss';
import type { IBooks } from '../../@types/books';

interface CoverBookProps {
  book: IBooks;
  setDisplayModalLibrary: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
}

function CoverBook({
  book,
  setDisplayModalLibrary,
  setCurrentBook,
}: CoverBookProps) {
  return (
    <>
      <li key={book.id} className="library-book">
        <Link to={`/book/${book.id}`} className="library-book-link">
          <figure>
            <div className="library-book-container">
              <button
                className="library-book-container-button"
                type="button"
                onClick={(event) => {
                  setDisplayModalLibrary(true);
                  event.preventDefault();
                  setCurrentBook(book);
                }}
              >
                ...
              </button>
              <img
                className="library-book-container-image"
                src={book.image}
                alt="book-image"
              />
              {!book.LibraryBook.read && (
                <span className="library-book-container-icon">
                  <img
                    src="../Pictures/tdesign--time.svg"
                    alt="Icon livre à lire"
                    title="à lire"
                  />
                </span>
              )}
              {book.LibraryBook.read && (
                <span className="library-book-container-icon">
                  <img
                    src="../Pictures/ph--book-open.svg"
                    alt="Icon livre lu"
                    title="livre lu"
                  />
                </span>
              )}
            </div>
            <hgroup className="library-book-infos">
              <figcaption className="library-book-infos-title">
                {book.title}
              </figcaption>
              <h5 className="library-book-infos-author">{book.author}</h5>
            </hgroup>
          </figure>
        </Link>
      </li>
    </>
  );
}

export default CoverBook;
