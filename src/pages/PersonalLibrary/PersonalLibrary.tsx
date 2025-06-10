import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import '../Books/Books.scss';
import './PersonalLibrary.scss';
import type { IBooks, IGenre, ILibrary } from '../../@types/books';
import CoverBook from '../../components/CoverBook/CoverBook';
import Loader from '../../components/Loader/Loader';
import FilterSection from '../../components/PersonalLibrary/FilterSection';
import PersonalLibraryHeader from '../../components/PersonalLibrary/PersonalLibraryHeader';
import api from '../../utils/axiosApi';

interface PersonalLibraryProps {
  setDisplayModalLibrary: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
  myLibraries: ILibrary[];
  setMyLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
  currentLibraries: ILibrary[];
  setCurrentLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
}

function PersonalLibrary({
  setDisplayModalLibrary,
  setCurrentBook,
  myLibraries,
  setMyLibraries,
  currentLibraries,
  setCurrentLibraries,
}: PersonalLibraryProps) {
  const [librariesStatus, setLibrariesStatus] = useState('all');
  const [displayFilter, setDisplayFilter] = useState(false);
  const [currentGenres, setCurrentGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ------------- FONCTION DE RECUPERATION DES BIBLIOTHEQUES ----------------------

  useEffect(() => {
    const getmyLibraries = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/libraries/books');
        setMyLibraries(response.data);
        setCurrentLibraries(response.data);
        genresFilter(response.data);
        setIsLoading(false);
        console.log('Response.data personalLibrary');
        console.log(response.data[0].Books[0].Genres[0]);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des bibliothèques',
          error,
        );
      }
    };
    getmyLibraries();
  }, [setMyLibraries, setCurrentLibraries]);

  function genresFilter(libraries: ILibrary[]) {
    const allGenres = libraries.flatMap((library) =>
      library.Books.flatMap((book: IBooks) =>
        book.Genres.map((genre: IGenre) => genre.name),
      ),
    );

    //Set => rend les valeurs uniques --- sort => tri par ordre alphabétique
    const uniqueGenres = [...new Set(allGenres)].sort();

    setCurrentGenres(uniqueGenres);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="personal-library">
      <PersonalLibraryHeader
        librariesStatus={librariesStatus}
        setLibrariesStatus={setLibrariesStatus}
        displayFilter={displayFilter}
        setDisplayFilter={setDisplayFilter}
      />

      <div className="personal-library-background">
        <div className={`filter ${displayFilter && 'active'}`}>
          <FilterSection
            myLibraries={myLibraries}
            currentGenres={currentGenres}
            setMyLibraries={setMyLibraries}
            setCurrentLibraries={setCurrentLibraries}
          />
        </div>

        {currentLibraries.map((library) => {
          return (
            <div className="libraries books-list" key={library.id}>
              <h3 className="libraries-title">{library.name}</h3>
              {library.Books.length === 0 && (
                <div className="libraries-empty">
                  <h4 className="libraries-empty-subtitle">
                    Votre bibliothèque est vide !
                  </h4>
                  <p className="libraries-empty-text">
                    Commencer par ajouter des livres, c'est simple et rapide.
                  </p>
                  <Link to="/books">
                    <button type="button" className="libraries-empty-button">
                      + Ajouter
                    </button>
                  </Link>
                </div>
              )}

              <ul className="books-list-ul">
                {librariesStatus === 'all' &&
                  library.Books.map((book, index) => {
                    return (
                      <div
                        key={book.id}
                        className="animated-book"
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        <CoverBook
                          book={book}
                          setDisplayModalLibrary={setDisplayModalLibrary}
                          setCurrentBook={setCurrentBook}
                        />
                      </div>
                    );
                  })}

                {librariesStatus === 'read' &&
                  library.Books.map((book, index) => {
                    if (book.LibraryBook.read) {
                      return (
                        <div
                          key={book.id}
                          className="animated-book"
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        >
                          <CoverBook
                            key={book.id}
                            book={book}
                            setDisplayModalLibrary={setDisplayModalLibrary}
                            setCurrentBook={setCurrentBook}
                          />
                        </div>
                      );
                    }
                  })}

                {librariesStatus === 'toRead' &&
                  library.Books.map((book, index) => {
                    if (!book.LibraryBook.read) {
                      return (
                        <div
                          key={book.id}
                          className="animated-book"
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        >
                          <CoverBook
                            key={book.id}
                            book={book}
                            setDisplayModalLibrary={setDisplayModalLibrary}
                            setCurrentBook={setCurrentBook}
                          />
                        </div>
                      );
                    }
                  })}

                {library.Books.length !== 0 && (
                  <li
                    className="library-book animated-book"
                    style={{
                      animationDelay: `${library.Books.length * 100}ms`,
                    }}
                  >
                    <Link to="/books" className="books-list-ul-container">
                      <figure>
                        <div className="books-list-ul-container-addbook">
                          <p className="books-list-ul-container-addbook-button">
                            <em>+</em> Ajouter
                          </p>
                          <div />
                        </div>
                      </figure>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PersonalLibrary;
