import axios from 'axios';
import api from '../../../utils/axiosApi';
import './Delete.scss';
import { useState } from 'react';
import type { IUserPasswordUpdateError } from '../../../@types/user';
import InputField from '../../Fields/InputField';

interface iDeleteUserProps {
  setDisplayDeleteUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmModal: React.Dispatch<React.SetStateAction<string>>;
}

function DeleteUserModal({
  setDisplayDeleteUserModal,
  setConfirmModal,
}: iDeleteUserProps) {
  const [deleteUserErrors, setDeleteUserErrors] =
    useState<IUserPasswordUpdateError>({
      password: '',
      confirmPassword: '',
    });

  //API Call
  async function handleDeleteUserDatas(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await api.delete('/user', {
        data: {
          currentPassword: formData.get('current-password'),
          confirmPassword: formData.get('confirm-password'),
        },
      });

      setDisplayDeleteUserModal(false);
      setConfirmModal('delete');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IUserPasswordUpdateError = {
          confirmPassword: '',
          password: '',
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IUserPasswordUpdateError] =
            error.message;
        }
        setDeleteUserErrors(formattedErrors);
      }
    }
  }

  return (
    <div className="hidden-background">
      <div className="confirmation-modal">
        <button
          type="button"
          onClick={() => setDisplayDeleteUserModal(false)}
          className="confirmation-modal-closeBtn"
        >
          <img
            src="../Pictures/gridicons--cross.svg"
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
          Attention, la suppression de votre compte est définitive. Êtes vous
          bien sûr de vouloir continuer ? Veuillez saisir votre mot de passe
          pour confirmer la suppression.
        </p>

        <form
          className="confirmation-modal-form"
          onSubmit={handleDeleteUserDatas}
        >
          <InputField
            label="Mot de passe *"
            name="current-password"
            type="password"
            error={deleteUserErrors.password}
            required
          />

          <InputField
            label="Confirmer le mot de passe *"
            name="confirm-password"
            type="password"
            error={deleteUserErrors.confirmPassword}
            required
          />

          <button className="confirmation-modal-form-button" type="submit">
            Supprimer mon compte
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteUserModal;
