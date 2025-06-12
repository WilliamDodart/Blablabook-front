import { Link } from 'react-router';
import './Authentification.scss';
import axios from 'axios';
import { useState } from 'react';
import type { IRegisterError } from '../../../@types/user';
import api from '../../../utils/axiosApi';

interface IRegisterFormProps {
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegisterForm({
  setDisplayLoginForm,
  setDisplayRegisterForm,
}: IRegisterFormProps) {
  const [errors, setErrors] = useState<IRegisterError>({} as IRegisterError);

  async function handleSubmitRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formDatas = new FormData(event.currentTarget);
    try {
      await api.post('/register', formDatas, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setDisplayRegisterForm(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IRegisterError = {
          email: '',
          password: '',
          firstname: '',
          name: '',
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IRegisterError] = error.message;
        }
        setErrors(formattedErrors);
      }
    }
  }

  return (
    <div className="hidden-background" /* onClick={closeRegisterForm} */>
      <div
        className="auth-modal"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setDisplayRegisterForm(false)}
          className="auth-modal-closeBtn"
        >
          <img src="../Pictures/gridicons--cross.svg" alt="Fermer la fenêtre" />
        </button>
        <form
          className="auth-modal-form"
          method="post"
          onSubmit={handleSubmitRegister}
        >
          <p className="auth-modal-form-title">Rejoindre BlaBla Book</p>
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
            <p className="auth-modal-form-error">{errors.email}</p>
          )}

          <label className="auth-modal-form-label" htmlFor="firstname">
            Prénom
          </label>
          <input
            className="auth-modal-form-input"
            type="text"
            id="firstname"
            name="firstname"
          />
          {errors.firstname && (
            <p className="auth-modal-form-error">{errors.firstname}</p>
          )}

          <label className="auth-modal-form-label" htmlFor="name">
            Nom
          </label>
          <input
            className="auth-modal-form-input"
            type="text"
            id="name"
            name="name"
          />
          {errors.name && (
            <p className="auth-modal-form-error">{errors.name}</p>
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
            <p className="auth-modal-form-error">{errors.password}</p>
          )}

          <div className="auth-modal-form-cg">
            <input
              className="auth-modal-form-input"
              type="checkbox"
              id="cgv"
              name="cgv"
              required
            />
            <label className="auth-modal-form-label" htmlFor="cgv">
              Conditions générales
            </label>
          </div>
          <button className="auth-modal-form-button" type="submit">
            S'inscrire
          </button>
          <Link
            to="#"
            className="auth-modal-form-redirection"
            onClick={() => {
              setDisplayRegisterForm(false);
              setDisplayLoginForm(true);
            }}
          >
            Déjà inscrit ? Se connecter
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
