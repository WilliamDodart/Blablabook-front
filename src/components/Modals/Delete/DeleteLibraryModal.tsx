import axios from 'axios';
import api from '../../../utils/axiosApi';
import './Delete.scss';
import { useState } from 'react';
import type { IDeleteLibraryError } from '../../../@types/libraries';
import InputField from '../../Fields/InputField';

interface iDeleteLibraryModalProps {
  libraryId: number;
  getUser: () => Promise<void>;
  setDisplayDeleteLibraryModal: (value: React.SetStateAction<boolean>) => void;
}

function DeleteLibraryModal({
  libraryId,
  getUser,
  setDisplayDeleteLibraryModal,
}: iDeleteLibraryModalProps) {
  const [deleteLibraryErrors, setDeleteLibraryErrors] =
    useState<IDeleteLibraryError>({
      password: '',
    });

  //API Call
  async function handleDeleteLibrary(
    event: React.FormEvent<HTMLFormElement>,
    id: number,
  ) {
    event.preventDefault();
    setDeleteLibraryErrors({} as IDeleteLibraryError);
    const form = event?.currentTarget;
    const formData = new FormData(form);
    try {
      await api.delete(`/library/${id}`, {
        data: {
          currentPassword: formData.get('current-password'),
        },
      });
      setDisplayDeleteLibraryModal(false);
      getUser();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IDeleteLibraryError = {
          password: '',
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IDeleteLibraryError] =
            error.message;
        }
        setDeleteLibraryErrors(formattedErrors);
      }
    }
  }

  return (
    <div className="hidden-background">
      <div className="confirmation-modal">
        <button
          type="button"
          onClick={() => setDisplayDeleteLibraryModal(false)}
          className="confirmation-modal-closeBtn"
        >
          <img
            src="./Pictures/gridicons--cross.svg"
            alt="Fermer la fenêtre"
            className="confirmation-modal-closeBtn-img"
          />
        </button>
        <img
          className="confirmation-modal-caution-icon"
          src="../Pictures/caution.png"
          alt="Icone de validation"
        />
        <p className="confirmation-modal-message">
          Êtes vous sûr de vouloir supprimer cette bibliothèque ? Veuillez
          saisir votre mot de passe pour confirmer la suppression.
        </p>
        <form
          className="confirmation-modal-form"
          onSubmit={(event) => {
            handleDeleteLibrary(event, libraryId);
          }}
        >
          <InputField
            label="Mot de passe actuel"
            name="current-password"
            type="password"
            error={deleteLibraryErrors.password}
            required
          />

          <button className="confirmation-modal-form-button" type="submit">
            Supprimer la librairie
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteLibraryModal;
