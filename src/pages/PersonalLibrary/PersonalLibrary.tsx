import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import '../Books/Books.scss';
import './PersonalLibrary.scss';
import type { IBooks, IGenre, ILibrary } from '../../@types/books';
import CoverBook from '../../components/CoverBook/CoverBook';
import Loader from '../../components/Loader/Loader';
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
      } catch (error) {
        error;
      }
    };
    getmyLibraries();
  }, [setMyLibraries, setCurrentLibraries]);

  // -------------- FONCTION DE CREATION DE BIBLITOTHEQUE -----------------------------

  async function handleLibraryCreation(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const newLibraryName = formData.get('newLibraryName') as string;

    try {
      const response = await api.post('/library', {
        name: newLibraryName,
      });
      const newLibrary = response.data;

      setMyLibraries((previousLibraries) => [
        ...previousLibraries,
        { ...newLibrary, Books: [] },
      ]);
      setCurrentLibraries((previousLibraries) => [
        ...previousLibraries,
        { ...newLibrary, Books: [] },
      ]);

      form.reset();
    } catch (_error) {}
  }

  // -------------- FONCTIONS DE FILTRE -----------------------------
  function handleFilterLibraries(event: React.ChangeEvent<HTMLSelectElement>) {
    const libraryId = event.target.value;
    if (libraryId === 'all') {
      setCurrentLibraries(myLibraries);
      return;
    }
    const filteredLibrary = [
      myLibraries.find((library) => library.id === Number(libraryId)),
    ].filter((lib): lib is ILibrary => lib !== undefined);

    setCurrentLibraries(filteredLibrary);
  }

  function handleFilterGenres(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedGenre = event.target.value;

    if (selectedGenre === 'all') {
      setCurrentLibraries(myLibraries);
      return;
    }

    const filteredLibrary = myLibraries.map((library) => {
      const filteredBooks = library.Books.filter((book) =>
        book.Genres.some((genre: IGenre) => genre.name === selectedGenre),
      );

      return {
        ...library,
        Books: filteredBooks,
      };
    });

    setCurrentLibraries(filteredLibrary);
  }

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
      <div className="personal-library-header">
        <h1 className="personal-library-header-title">Mes bibliothèques</h1>
        <ul className="personal-library-header-list">
          <NavLink
            className="personal-library-header-list-navlink"
            to=""
            onClick={(event) => {
              event.preventDefault();
              setLibrariesStatus('all');
            }}
          >
            <li
              className={
                librariesStatus === 'all'
                  ? 'personal-library-header-list-link selected-status'
                  : 'personal-library-header-list-link'
              }
            >
              Tous
            </li>
          </NavLink>
          <NavLink
            className="personal-library-header-list-navlink"
            to=""
            onClick={(event) => {
              event.preventDefault();
              setLibrariesStatus('read');
            }}
          >
            <li
              className={
                librariesStatus === 'read'
                  ? 'personal-library-header-list-link selected-status'
                  : 'personal-library-header-list-link'
              }
            >
              Lus
            </li>
          </NavLink>
          <NavLink
            className="personal-library-header-list-navlink"
            to=""
            onClick={(event) => {
              event.preventDefault();
              setLibrariesStatus('toRead');
            }}
          >
            <li
              className={
                librariesStatus === 'toRead'
                  ? 'personal-library-header-list-link selected-status'
                  : 'personal-library-header-list-link'
              }
            >
              À lire
            </li>
          </NavLink>
          <button
            className={
              displayFilter
                ? 'personal-library-header-list-button selected-filter'
                : 'personal-library-header-list-button'
            }
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setDisplayFilter(!displayFilter);
            }}
          >
            ...
          </button>
        </ul>
      </div>

      <div className="personal-library-background">
        <div className={`filter ${displayFilter && 'active'}`}>
          <div className="filter-section">
            <p className="filter-section-text">Filter par :</p>
            <div className="filter-section-library">
              <p className="filter-section-library-label">Bibliothèque</p>
              <select onChange={(event) => handleFilterLibraries(event)}>
                <option value="all">Toutes</option>
                {myLibraries.map((library) => (
                  <option key={library.id} value={library.id}>
                    {library.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-section-genres">
              <p className="filter-section-genres-label">Genre</p>
              <select onChange={(event) => handleFilterGenres(event)}>
                <option value="all">Tous</option>
                {currentGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <form
              className="filter-section-form"
              onSubmit={handleLibraryCreation}
            >
              <input
                className="filter-section-form-input"
                type="text"
                id="newLibraryName"
                name="newLibraryName"
                placeholder="Créer une bibliothèque"
                required
              />
              <button className="filter-section-form-button" type="submit">
                Créer
              </button>
            </form>
          </div>
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
                    <Link to="/books">
                      <figure>
                        <div className="books-list-ul-addbook">
                          <p className="books-list-ul-addbook-button">
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
