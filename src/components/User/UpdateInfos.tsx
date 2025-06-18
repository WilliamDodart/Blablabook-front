import axios from 'axios';
import { useState } from 'react';
import type { IUser, IUserDatasUpdateError } from '../../@types/user';
import api from '../../utils/axiosApi';
import InputField from '../Fields/InputField';
import './Update.scss';

interface IUpdateInfosProps {
  user?: IUser;
  getUser: () => Promise<void>;
  setConfirmModal: React.Dispatch<React.SetStateAction<string>>;
}

function UpdateInfos({ user, getUser, setConfirmModal }: IUpdateInfosProps) {
  const [errors, setErrors] = useState<IUserDatasUpdateError>(
    {} as IUserDatasUpdateError,
  );

  //API Call
  async function handleUserDatasUpdate(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setErrors({} as IUserDatasUpdateError);
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      await api.patch('/user', {
        name: formData.get('name'),
        firstname: formData.get('firstname'),
        email: formData.get('email'),
        currentPassword: formData.get('current-password'),
      });
      form.reset();
      getUser();
      setConfirmModal('update');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IUserDatasUpdateError = {
          password: '',
          email: '',
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IUserDatasUpdateError] =
            error.message;
        }
        setErrors(formattedErrors);
      }
    }
  }

  return (
    <form className="profile-infos" onSubmit={handleUserDatasUpdate}>
      <InputField label="Nom" name="name" defaultValue={user?.name} />

      <InputField
        label="Prénom"
        name="firstname"
        defaultValue={user?.firstname}
      />

      <InputField
        label="Email"
        name="email"
        defaultValue={user?.email}
        error={errors.email}
      />

      <InputField
        label="Mot de passe actuel"
        type="password"
        name="current-password"
        error={errors.password}
        required
      />

      <button className="user-button" type="submit">
        Modifier
      </button>
    </form>
  );
}

export default UpdateInfos;
