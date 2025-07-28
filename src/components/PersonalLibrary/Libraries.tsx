import { Link } from 'react-router';
import type { IBooks, ILibrary } from '../../@types/books';
import CoverBook from '../CoverBook/CoverBook';
import './Libraries.scss';

interface ILibrariesProps {
  library: ILibrary;
  librariesStatus: string;
  setDisplayModalLibrary: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
}

function Libraries({
  library,
  librariesStatus,
  setDisplayModalLibrary,
  setCurrentBook,
}: ILibrariesProps) {
  //Modification de l'affichage en fonction du tri
  const filteredBooks = library.Books.filter((book) => {
    if (librariesStatus === 'read') return book.LibraryBook.read;
    if (librariesStatus === 'toRead') return !book.LibraryBook.read;
    return true;
  });

  return (
    <div className="libraries books-list">
      <h3 className="libraries-title">{library.name}</h3>

      {/* Affichage conditionnel dans le cas d'une bibliothèque vide */}
      {library.Books.length === 0 ? (
        <div className="libraries-empty">
          <h4 className="libraries-empty-subtitle">
            Votre bibliothèque est vide !
          </h4>
          <p className="libraries-empty-text">
            Commencer par ajouter des livres, c'est simple et rapide.
          </p>

          {/* Lien vers la page Tous les livres */}
          <Link to="/books">
            <button type="button" className="libraries-empty-button">
              + Ajouter
            </button>
          </Link>
        </div>

        // Affichage conditionnel dans le cas d'un bibliothèque comprenant un ou plusieurs livres
      ) : (
        <ul className="books-list-ul">
          {filteredBooks.map((book, index) => (
            <div
              key={book.id}
              className="animated-book"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CoverBook
                book={book}
                setDisplayModalLibrary={setDisplayModalLibrary}
                setCurrentBook={setCurrentBook}
              />
            </div>
          ))}

          {/* Bouton pour ajouter un nouveau livre  */}
          <li
            className="library-book animated-book"
            style={{ animationDelay: `${filteredBooks.length * 100}ms` }}
          >
            <Link to="/books" className="books-list-ul-container">
              <figure>
                <div className="books-list-ul-container-addbook">
                  <p className="books-list-ul-container-addbook-button">
                    <em>+</em> Ajouter
                  </p>
                </div>
              </figure>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Libraries;
