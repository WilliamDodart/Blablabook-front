import { useEffect, useState } from 'react';
import './Books.scss';
import type { IBooks } from '../../@types/books';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';
import api from '../../utils/axiosApi';
import { filterBooks } from '../../utils/bookHelper';

interface BooksProps {
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
}

function Books({ setDisplayModalBook, setCurrentBook }: BooksProps) {
  const [allBooks, setAllBooks] = useState<IBooks[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleBookCount, setVisibleBookCount] = useState<number>(18);

  const filteredBooks = filterBooks(allBooks, searchInput);
  const visibleBooks = filteredBooks.slice(0, visibleBookCount);

  //API Call
  useEffect(() => {
    async function getAllBooks() {
      try {
        setIsLoading(true);
        const response = await api.get('/books');
        setAllBooks(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres', error);
      }
    }
    getAllBooks();
  }, []);

  // Input handler
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
    setVisibleBookCount(18);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="books">
      <div className="books-header">
        <h1 className="books-header-title">Tous nos livres</h1>
        <input
          type="text"
          placeholder="Rechercher parmis nos livres"
          value={searchInput}
          onChange={handleSearchChange}
          className="books-header-search"
        />
      </div>

      <div className="books-list">
        {filteredBooks.length === 0 ? (
          <p className="books-list-no-results">
            Aucun livre ne correspond à votre recherche !
          </p>
        ) : (
          <ul className="books-list-ul">
            {visibleBooks.map((book: IBooks, index: number) => (
              <BookCard
                key={book.id}
                book={book}
                index={index}
                setDisplayModalBook={setDisplayModalBook}
                setCurrentBook={setCurrentBook}
              />
            ))}
          </ul>
        )}

        <div className="books-list-buttons">
          {visibleBookCount < filteredBooks.length && (
            <button
              type="button"
              className="button-more"
              onClick={() => setVisibleBookCount((count) => count + 18)}
            >
              Afficher plus
            </button>
          )}
          {visibleBookCount > 18 && (
            <button
              type="button"
              className="button-less"
              onClick={() =>
                setVisibleBookCount((count) => Math.max(18, count - 18))
              }
            >
              Afficher moins
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
export default Books;
