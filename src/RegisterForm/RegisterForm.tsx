import { Link } from 'react-router';
import './RegisterForm.scss';
import axios from 'axios';
import { useState } from 'react';

interface iRegisterFormProps {
  closeRegisterForm: () => void;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegisterForm({
  closeRegisterForm,
  setDisplayLoginForm,
}: iRegisterFormProps) {
  const [errors, setErrors] = useState({});

  async function handleSubmitRegister(event) {
    event.preventDefault();
    const formDatas = new FormData(event.target);
    try {
      await axios.post('http://localhost:3000/register', formDatas, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      closeRegisterForm();
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
    <div className="hidden-background" onClick={closeRegisterForm}>
      <div className="register" onClick={(event) => event.stopPropagation()}>
        <form
          className="register-form"
          method="post"
          onSubmit={handleSubmitRegister}
        >
          <p className="register-form-title">Rejoindre BlaBla Book</p>
          <label className="register-form-label" htmlFor="email">
            Adresse mail
          </label>
          <input
            className="register-form-input"
            type="email"
            id="email"
            name="email"
          />
          {errors.email && (
            <p className="register-form-error">{errors.email}</p>
          )}

          <label className="register-form-label" htmlFor="firstname">
            Prénom
          </label>
          <input
            className="register-form-input"
            type="text"
            id="firstname"
            name="firstname"
          />
          {errors.firstname && (
            <p className="register-form-error">{errors.firstname}</p>
          )}

          <label className="register-form-label" htmlFor="name">
            Nom
          </label>
          <input
            className="register-form-input"
            type="text"
            id="name"
            name="name"
          />
          {errors.name && <p className="register-form-error">{errors.name}</p>}

          <label className="register-form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="register-form-input"
            type="password"
            id="password"
            name="password"
          />
          {errors.password && (
            <p className="register-form-error">{errors.password}</p>
          )}

          <div className="register-form-div">
            <input
              className="register-form-input"
              type="checkbox"
              id="cgv"
              name="cgv"
            />
            <label className="register-form-label" htmlFor="cgv">
              Conditions générales
            </label>
          </div>
          <button className="register-form-button" type="submit">
            S'inscrire
          </button>
          <Link
            to="#"
            className="register-form-redirection"
            onClick={() => {
              closeRegisterForm();
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
