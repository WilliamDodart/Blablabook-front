import { useCallback, useState } from 'react';
import api from '../../../utils/axiosApi';
import './Delete.scss';
import axios from 'axios';
import type { IDeleteBookError } from '../../../@types/admin';
import type { IBooks } from '../../../@types/books';

interface IDeleteProps {
  closeConfirmDeleteBookModal: () => void;
  currentBookIDtoUpdate: number | undefined;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAllBooks: React.Dispatch<React.SetStateAction<IBooks[]>>;
}

function DeleteBookModal({
  closeConfirmDeleteBookModal,
  currentBookIDtoUpdate,
  setIsLoading,
  setAllBooks,
}: IDeleteProps) {
  const [errors, setErrors] = useState<IDeleteBookError>(
    {} as IDeleteBookError,
  );

  async function deleteBook(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const form = event.currentTarget;
      const formData = new FormData(form);

      await api.delete(`/admin/book/${currentBookIDtoUpdate}`, {
        data: {
          password: formData.get('current-password'),
        },
      });

      console.log(event);
      getAllBooks();
      closeConfirmDeleteBookModal();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IDeleteBookError = {
          password: '',
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IDeleteBookError] = error.error;
        }
        setErrors(formattedErrors);
      }
    }
  }

  const getAllBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/books');
      setAllBooks(response.data);
      setIsLoading(false);
    } catch (_error) {
      setIsLoading(false);
    }
  }, [setIsLoading, setAllBooks]);

  return (
    <div className="hidden-background">
      <div className="confirmation-modal">
        <button
          type="button"
          onClick={closeConfirmDeleteBookModal}
          className="confirmation-modal-closeBtn"
        >
          <img
            src="../Pictures/gridicons--cross.svg"
            alt="Fermer la fenêtre"
            className="confirmation-modal-closeBtn-img"
          />
        </button>
        <img
          src="../Pictures/caution.png"
          alt="Icone de validation"
          className="confirmation-modal-caution-icon"
        />
        <p className="confirmation-modal-message">
          Êtes vous sûr de vouloir supprimer ce livre ? Veuillez saisir votre
          mot de passe administrateur pour confirmer la suppression.
        </p>
        <form
          className="confirmation-modal-form"
          onSubmit={(event) => {
            event.preventDefault();
            deleteBook(event);
          }}
        >
          <label htmlFor="current-password">Mot de passe administrateur</label>
          <input
            type="password"
            name="current-password"
            id="current-password"
          />
          {errors.password && (
            <p className="confirmation-modal-form-error">{errors.password}</p>
          )}
          <button className="confirmation-modal-form-button" type="submit">
            Supprimer le livre
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteBookModal;
