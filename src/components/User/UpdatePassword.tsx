import type { IUserUpdateError } from '../../@types/user';

interface IUpdatePassword {
  errors: IUserUpdateError;
  handleUserDatasUpdate(event: React.FormEvent<HTMLFormElement>): Promise<void>;
}

function UpdatePassword({ errors, handleUserDatasUpdate }: IUpdatePassword) {
  return (
    <form onSubmit={handleUserDatasUpdate}>
      <label className="user-update-form-label" htmlFor="current-password">
        Mot de passe actuel <em>*</em>
      </label>
      <input
        className="user-update-form-input"
        type="password"
        id="current-password"
        name="current-password"
      />
      {errors.password && (
        <p className="register-form-error">{errors.password}</p>
      )}
      <label className="user-update-form-label" htmlFor="new-password">
        Nouveau mot de passe <em>*</em>
      </label>
      <input
        className="user-update-form-input"
        type="password"
        id="new-password"
        name="new-password"
      />
      <label className="user-update-form-label" htmlFor="renew-password">
        Confirmer le mot de passe <em>*</em>
      </label>
      <input
        className="user-update-form-input"
        type="password"
        id="renew-password"
        name="confirm-password"
      />
      {errors.confirmPassword && (
        <p className="register-form-error">{errors.confirmPassword}</p>
      )}
      <button className="user-update-form-button" type="submit">
        Modifier
      </button>
    </form>
  );
}

export default UpdatePassword;
