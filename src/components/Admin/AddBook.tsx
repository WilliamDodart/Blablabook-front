import axios from 'axios';
import { useState } from 'react';
import type { IAddBookError } from '../../@types/admin';
import type { IGenre } from '../../@types/books';
import api from '../../utils/axiosApi';
import GenreField from '../Fields/GenreField';
import InputField from '../Fields/InputField';
import './AdminCrud.scss';

interface IAddBookProps {
  setConfirmModal: React.Dispatch<React.SetStateAction<string>>;
  allGenres: IGenre[];
}

function AddBook({ setConfirmModal, allGenres }: IAddBookProps) {
  const [errors, setErrors] = useState<IAddBookError>({} as IAddBookError);
  const [imageUrl, setImageUrl] = useState(
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg',
  );

  // Fonctionnalité d'ajout d'un livre
  async function addBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({} as IAddBookError);
    const formData = new FormData(event.currentTarget);

    try {
      await api.post('/admin/book', {
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
      setConfirmModal('add');
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
      }
    }
  }

  return (
    <form onSubmit={addBook}>
      <div className="admin-add">
        <div className="admin-add-image">
          <img src={imageUrl} alt="aperçu du livre" />
        </div>
        <div className="admin-add-fields">
          <InputField
            label="Nom du livre:"
            name="title"
            placeholder="Don Quichotte"
            error={errors.title}
          />

          <InputField
            label="URL image:"
            name="image"
            placeholder="https://www.image-du-livre.jpg"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            error={errors.image}
          />

          <InputField
            label="Auteur:"
            name="author"
            placeholder="Prénom Nom"
            error={errors.author}
          />

          <InputField
            label="Année de parution:"
            name="publication_year"
            placeholder="1964"
            error={errors.publication_year}
          />

          <InputField
            label="Éditeur:"
            name="editor"
            placeholder="Gallimard, Hachette..."
            error={errors.editor}
          />

          <InputField
            label="ISBN:"
            name="isbn"
            placeholder="10 à 13 chiffres"
            error={errors.isbn}
          />

          <InputField
            label="Pages:"
            name="pages"
            placeholder="361"
            error={errors.pages}
          />

          <GenreField
            name="genre1"
            label="1er genre:"
            option="Choisir le genre princial"
            allGenres={allGenres}
          />

          <GenreField
            name="genre2"
            label="2ème genre:"
            option="Choisir le genre secondaire"
            allGenres={allGenres}
            primary={false}
          />

          <label htmlFor="summary">Résumé:</label>
          <textarea
            name="summary"
            id="summary"
            placeholder="Description du livre"
            required
          />
          {errors?.summary && (
            <p className="register-form-error">{errors.summary}</p>
          )}

          <button type="submit">Valider</button>
        </div>
      </div>
    </form>
  );
}

export default AddBook;
