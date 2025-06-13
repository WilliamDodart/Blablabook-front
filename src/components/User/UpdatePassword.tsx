import axios from 'axios';
import { useState } from 'react';
import type { IUserPasswordUpdateError } from '../../@types/user';
import api from '../../utils/axiosApi';
import InputField from '../Fields/InputField';
import './Update.scss';

interface IUpdatePassword {
  getUser: () => Promise<void>;
  setConfirmModal: React.Dispatch<React.SetStateAction<string>>;
}

function UpdatePassword({ getUser, setConfirmModal }: IUpdatePassword) {
  const [errors, setErrors] = useState<IUserPasswordUpdateError>(
    {} as IUserPasswordUpdateError,
  );

  //API Call
  async function handleUserPasswordUpdate(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setErrors({} as IUserPasswordUpdateError);
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      await api.patch('/user', {
        currentPassword: formData.get('current-password'),
        newPassword: formData.get('new-password'),
        confirmPassword: formData.get('confirm-password'),
      });
      form.reset();
      getUser();
      setConfirmModal('update');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IUserPasswordUpdateError = {
          confirmPassword: '',
          password: '',
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IUserPasswordUpdateError] =
            error.error;
        }
        setErrors(formattedErrors);
      }
    }
  }

  return (
    <form className="profile-password" onSubmit={handleUserPasswordUpdate}>
      <InputField
        label="Mot de passe actuel"
        type="password"
        name="current-password"
        error={errors.password}
        required
      />

      <InputField
        label="Nouveau mot de passe"
        type="password"
        name="new-password"
        //error={errors.password}
        required
      />

      <InputField
        label="Confirmer le mot de passe"
        type="password"
        name="confirm-password"
        error={errors.confirmPassword}
        required
      />

      <button className="user-button" type="submit">
        Modifier
      </button>
    </form>
  );
}

export default UpdatePassword;
