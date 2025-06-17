import { useState } from 'react';
import type { IBooks, IGenre } from '../../@types/books';
import api from '../../utils/axiosApi';
import GenreField from '../Fields/GenreField';
import InputField from '../Fields/InputField';
import type { IAddBookError } from '../../@types/admin';
import axios from 'axios';

interface IUpdateBookProps {
  allBooks: IBooks[];
  allGenres: IGenre[];
  currentBookIDtoUpdate: number | undefined;
  getAllGenres: () => Promise<void>;
  getAllBooks: () => Promise<void>;
  setConfirmModal: React.Dispatch<React.SetStateAction<string>>;
  setCurrentBookIDtoUpdate: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

const defaultBookState = {
  image: 'https://m.media-amazon.com/images/I/6155jsTHk1L._SL1499_.jpg',
  title: '',
  author: '',
  publication_year: Number(''),
  editor: '',
  isbn: Number(''),
  pages: Number(''),
  summary: '',
};

function UpdateBook({
  allBooks,
  allGenres,
  currentBookIDtoUpdate,
  setConfirmModal,
  setCurrentBookIDtoUpdate,
  getAllGenres,
  getAllBooks,
}: IUpdateBookProps) {
  const [errors, setErrors] = useState<IAddBookError>({} as IAddBookError);
  const [updateBookState, setUpdateBookState] = useState(defaultBookState);

  //API Call
  async function updateBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await api.patch(`/admin/book/${currentBookIDtoUpdate}`, {
        title: formData.get('title'),
        image: formData.get('image'),
        author: formData.get('author'),
        publication_year: Number(formData.get('publication_year')),
        editor: formData.get('editor'),
        isbn: formData.get('isbn'),
        pages: Number(formData.get('pages')),
        genre1: formData.get('genre1'),
        genre2: formData.get('genre2'),
        summary: formData.get('summary'),
      });
      setConfirmModal('update');
      getAllBooks();
      getAllGenres();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IAddBookError = {
          title: '',
          image: '',
          author: '',
          publication_year: '',
          editor: '',
          isbn: '',
          pages: '',
          summary: '',
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IAddBookError] = error.message;
        }
        setErrors(formattedErrors);
      } else {
        console.error('Erreur lors de la modification du livres', error);
      }
    }
  }

  //Form Handler
  function handleBookSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedId = event.target.value;
    const selectedBook = allBooks.find(
      (book) => String(book.id) === selectedId,
    );
    if (selectedBook) {
      setUpdateBookState({
        image: selectedBook.image || '',
        title: selectedBook.title || '',
        author: selectedBook.author || '',
        publication_year: selectedBook.publication_year || Number(''),
        editor: selectedBook.editor || '',
        isbn: selectedBook.isbn || Number(''),
        pages: selectedBook.pages || Number(''),
        summary: selectedBook.summary || '',
      });
      setCurrentBookIDtoUpdate(Number(selectedId));
    } else {
      setUpdateBookState(defaultBookState);
    }
  }

  return (
    <form onSubmit={updateBook}>
      <div className="update-selection">
        <select
          name="book-to-update"
          className="update-selection-field"
          onChange={handleBookSelectChange}
        >
          <option value="">Choisir le livre à modifier:</option>
          {[...allBooks]
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} - {book.author}
              </option>
            ))}
        </select>
      </div>

      <div className="admin-update">
        <div className="admin-update-image">
          <img src={updateBookState.image} alt="aperçu de la couverture" />
        </div>

        <div className="admin-update-fields">
          <InputField
            label="Nom du livre:"
            name="title"
            placeholder="Don Quichotte"
            value={updateBookState.title}
            error={errors.title}
            onChange={(e) =>
              setUpdateBookState((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />

          <InputField
            label="URL image:"
            name="image"
            placeholder="https://..."
            value={updateBookState.image}
            onChange={(e) =>
              setUpdateBookState((prev) => ({
                ...prev,
                image: e.target.value,
              }))
            }
          />

          <InputField
            label="Auteur:"
            name="author"
            placeholder="Prénom Nom"
            value={updateBookState.author}
            error={errors.author}
            onChange={(e) =>
              setUpdateBookState((prev) => ({
                ...prev,
                author: e.target.value,
              }))
            }
          />

          <InputField
            label="Parution:"
            name="publication_year"
            placeholder="1964"
            value={String(updateBookState.publication_year)}
            error={errors.publication_year}
            onChange={(e) =>
              setUpdateBookState((prev) => ({
                ...prev,
                publication_year: Number(e.target.value),
              }))
            }
          />

          <InputField
            label="Édition:"
            name="editor"
            placeholder="Gallimard..."
            value={updateBookState.editor}
            error={errors.editor}
            onChange={(e) =>
              setUpdateBookState((prev) => ({
                ...prev,
                editor: e.target.value,
              }))
            }
          />

          <InputField
            label="ISBN:"
            name="isbn"
            placeholder="10 à 13 chiffres"
            value={String(updateBookState.isbn)}
            error={errors.isbn}
            onChange={(e) =>
              setUpdateBookState((prev) => ({
                ...prev,
                isbn: Number(e.target.value),
              }))
            }
          />

          <InputField
            label="Pages:"
            name="pages"
            placeholder="361"
            value={String(updateBookState.pages)}
            error={errors.pages}
            onChange={(e) =>
              setUpdateBookState((prev) => ({
                ...prev,
                pages: Number(e.target.value),
              }))
            }
          />

          <GenreField
            name="genre1"
            label="1er genre:"
            option="Choisir le genre princial"
            allGenres={allGenres}
            //error={errors.title}
          />

          <GenreField
            name="genre2"
            label="2ème genre:"
            option="Choisir le genre secondaire"
            allGenres={allGenres}
            primary={false}
            //error={errors.title}
          />

          <label htmlFor="summary">Résumé:</label>
          <textarea
            name="summary"
            id="summary"
            placeholder="Description du livre"
            value={updateBookState.summary}
            onChange={(e) =>
              setUpdateBookState((prev) => ({
                ...prev,
                summary: e.target.value,
              }))
            }
            required
          />
          {errors.summary && <p className="form-error">{errors.summary}</p>}

          <button type="submit">Valider</button>
        </div>
      </div>
    </form>
  );
}

export default UpdateBook;
