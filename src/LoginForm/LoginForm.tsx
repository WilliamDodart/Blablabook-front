import { Link } from 'react-router';
import './LoginForm.scss';
import axios from 'axios';
import { useState } from 'react';
import type { IUser } from '../@types/user';

interface iRegisterFormProps {
  closeLoginForm: () => void;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({
  closeLoginForm,
  setUser,
  setIsLogged,
  setDisplayRegisterForm,
}: iRegisterFormProps) {
  const [errors, setErrors] = useState({});

  async function handleSubmitLogin(event) {
    event.preventDefault();
    const formDatas = new FormData(event.target);
    try {
      const httpResponse = await axios.post(
        'http://localhost:3000/login',
        formDatas,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setUser(httpResponse.data.currentUser);
      localStorage.setItem('token', httpResponse.data.token);
      setIsLogged(true);
      closeLoginForm();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: { [key: string]: string } = {};
        for (const error of zodErrors) {
          formattedErrors[error.field] = error.message;
        }
        setErrors(formattedErrors);
      }
    }
  }

  return (
    <div className="hidden-background" onClick={closeLoginForm}>
      <div className="login" onClick={(event) => event.stopPropagation()}>
        <form className="login-form" method="post" onSubmit={handleSubmitLogin}>
          <p className="login-form-title">Connexion</p>
          <label className="login-form-label" htmlFor="email">
            Adresse mail
          </label>
          <input
            className="login-form-input"
            type="email"
            id="email"
            name="email"
          />
          {errors.email && (
            <p className="register-form-error">{errors.email}</p>
          )}

          <label className="login-form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="login-form-input"
            type="password"
            id="password"
            name="password"
          />
          {errors.password && (
            <p className="register-form-error">{errors.password}</p>
          )}

          <button className="login-form-button" type="submit">
            Se connecter
          </button>
          <Link
            to="#"
            className="login-form-redirection"
            onClick={() => {
              closeLoginForm();
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
