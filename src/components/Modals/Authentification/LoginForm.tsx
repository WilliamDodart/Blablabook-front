import { Link } from 'react-router';
import './Authentification.scss';
import axios from 'axios';
import { useState } from 'react';
import type { ILibrary } from '../../../@types/books';
import type { IUser, IUserError } from '../../../@types/user';
import api from '../../../utils/axiosApi';
import InputField from '../../Fields/InputField';
import { successToast } from '../../../utils/toast';

interface ILoginFormProps {
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  setMyLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({
  setUser,
  setIsLogged,
  setDisplayRegisterForm,
  setMyLibraries,
  setDisplayLoginForm,
}: ILoginFormProps) {
  const [errors, setErrors] = useState<IUserError>({} as IUserError);

  async function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const formData = {
      email: form.get('email'),
      password: form.get('password'),
    };
    try {
      const httpResponse = await api.post('/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUser(httpResponse.data.currentUser);
      localStorage.setItem('token', httpResponse.data.token);
      setIsLogged(true);
      const response = await api.get('/libraries/books');
      setMyLibraries(response.data);
      setDisplayLoginForm(false);
      successToast(
        `Connexion réussie, bienvenue ${httpResponse.data.currentUser.firstname}`,
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IUserError = {
          email: '',
          password: '',
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IUserError] = error.message;
        }
        setErrors(formattedErrors);
      }
    }
  }

  return (
    <div className="hidden-background">
      <div
        className="auth-modal"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setDisplayLoginForm(false)}
          className="auth-modal-closeBtn"
        >
          <img src="../Pictures/gridicons--cross.svg" alt="Fermer la fenêtre" />
        </button>

        <form
          className="auth-modal-form"
          method="post"
          onSubmit={handleSubmitLogin}
        >
          <p className="auth-modal-form-title">Connexion</p>

          <InputField
            label="Adresse mail"
            type="email"
            name="email"
            error={errors.email}
            required
          />

          <InputField
            label="Mot de passe"
            type="password"
            name="password"
            error={errors.password}
            required
          />

          <button className="auth-modal-form-button" type="submit">
            Se connecter
          </button>
          <Link
            to="#"
            className="auth-modal-form-redirection"
            onClick={() => {
              setDisplayLoginForm(false);
              setDisplayRegisterForm(true);
            }}
          >
            Pas encore inscrit ? Se créer un compte
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
