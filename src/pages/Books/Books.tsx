import { useEffect, useState } from 'react';
import './Books.scss';
import type { IBooks } from '../../@types/books';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';
import api from '../../utils/axiosApi';

interface BooksProps {
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
}

function Books({ setDisplayModalBook, setCurrentBook }: BooksProps) {
  // État pour afficher tous les livres
  const [allBooks, setAllBooks] = useState<IBooks[]>([]);
  // État pour gérer la recherche (titre + auteur)

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState<number>(18);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/books');
        setAllBooks(response.data);
        setIsLoading(false);
      } catch (_error) {}
    };
    getAllBooks();
  }, []);

  // Fonction pour gérer le changement dans la barre de recherche, elle met à jour l'état searchTerm à chaque changement dans le champ de recherche.
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setVisibleCount(18); // Réinitialise la pagination lors d'une recherche
  };

  // Filtrer les livres en fonction du titre ou de l'auteur taper dans la barre de recherche
  const filteredBooks = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return <Loader />;
  }

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 18, filteredBooks.length));
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(18, prev - 18));
  };

  return (
    <section className="section books-section">
      <div className="head-books">
        <h1 className="books-section-title">Tous nos livres</h1>
        <input
          type="text"
          placeholder="Rechercher parmis nos livres"
          value={searchTerm}
          onChange={handleSearchChange}
          className="books-section-search"
        />
      </div>

      <div className="books-list">
        {filteredBooks.length === 0 && (
          <p className="books-list-no-results">
            Aucun livre ne correspond à votre recherche !
          </p>
        )}

        <ul className="books-list-ul">
          {visibleBooks.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              index={index}
              setDisplayModalBook={setDisplayModalBook}
              setCurrentBook={setCurrentBook}
            />
          ))}
        </ul>

        <div className="show-buttons-container">
          {visibleCount < filteredBooks.length && (
            <button
              type="button"
              className="show-more-btn"
              onClick={handleShowMore}
            >
              Afficher plus
            </button>
          )}
          {visibleCount > 18 && (
            <button
              type="button"
              className="show-less-btn"
              onClick={handleShowLess}
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
