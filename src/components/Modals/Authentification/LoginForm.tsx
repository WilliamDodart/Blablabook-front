import { Link } from 'react-router';
import './Authentification.scss';
import axios from 'axios';
import { useState } from 'react';
import type { ILibrary } from '../../../@types/books';
import type { IUser, IUserError } from '../../../@types/user';
import api from '../../../utils/axiosApi';

interface iRegisterFormProps {
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
}: iRegisterFormProps) {
  const [errors, setErrors] = useState<IUserError>({} as IUserError);

  async function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formDatas = new FormData(event.currentTarget);
    try {
      const httpResponse = await api.post('/login', formDatas, {
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
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IUserError = {
          email: '',
          password: '',
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IUserError] = error.error;
        }
        setErrors(formattedErrors);
      }
    }
  }

  return (
    <div className="hidden-background" /* onClick={closeLoginForm} */>
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
          <label className="auth-modal-form-label" htmlFor="email">
            Adresse mail
          </label>
          <input
            className="auth-modal-form-input"
            type="email"
            id="email"
            name="email"
          />
          {errors.email && (
            <p className="register-form-error">{errors.email}</p>
          )}

          <label className="auth-modal-form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="auth-modal-form-input"
            type="password"
            id="password"
            name="password"
          />
          {errors.password && (
            <p className="register-form-error">{errors.password}</p>
          )}

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
