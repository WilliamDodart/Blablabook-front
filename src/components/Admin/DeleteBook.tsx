import { useState } from 'react';
import type { IBooks } from '../../@types/books';

interface IDeleteBookProps {
  allBooks: IBooks[];
  setCurrentBookIDtoUpdate: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  setDisplayDeleteBookModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteBook({
  allBooks,
  setCurrentBookIDtoUpdate,
  setDisplayDeleteBookModal,
}: IDeleteBookProps) {
  const [selectedBook, setSelectedBook] = useState<IBooks | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const book = allBooks.find((book) => book.id === selectedId) || null;
    setSelectedBook(book);
    setCurrentBookIDtoUpdate(book?.id);
  };

  return (
    <form>
      <div className="book-modification-selection">
        <select onChange={handleSelectChange} defaultValue="">
          <option value="">Choisir le livre à supprimer:</option>
          {allBooks
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} - {book.author}
              </option>
            ))}
        </select>
      </div>

      {selectedBook && (
        <div className="book-modification-presentation">
          <div className="book-modification-presentation-image">
            <img src={selectedBook.image} alt={selectedBook.title} />
          </div>

          <div className="book-modification-presentation-texts">
            <p>
              <strong>Titre :</strong> {selectedBook.title}
            </p>
            <p>
              <strong>Auteur :</strong> {selectedBook.author}
            </p>
            <p>
              <strong>ISBN :</strong> {selectedBook.isbn}
            </p>

            <button
              className="delete"
              type="button"
              onClick={() => setDisplayDeleteBookModal(true)}
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default DeleteBook;
