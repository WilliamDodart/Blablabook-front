import { useState } from 'react';
import api from '../../../utils/axiosApi';
import './Delete.scss';
import axios from 'axios';
import type { IDeleteBookError } from '../../../@types/admin';

interface IDeleteProps {
  getAllBooks: () => Promise<void>;
  setDisplayDeleteBookModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentBookIDtoUpdate: number | undefined;
}

function DeleteBookModal({
  getAllBooks,
  setDisplayDeleteBookModal,
  currentBookIDtoUpdate,
}: IDeleteProps) {
  const [errors, setErrors] = useState<IDeleteBookError>({ password: '' });

  //Form Handler
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await api.delete(`/admin/book/${currentBookIDtoUpdate}`, {
        data: {
          password: formData.get('current-password'),
        },
      });
      await getAllBooks();
      setDisplayDeleteBookModal(false);
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

  return (
    <div className="hidden-background">
      <div className="confirmation-modal">
        <button
          type="button"
          onClick={() => setDisplayDeleteBookModal(false)}
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
        <form className="confirmation-modal-form" onSubmit={handleSubmit}>
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
