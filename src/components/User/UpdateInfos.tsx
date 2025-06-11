import type { IUser, IUserUpdateError } from '../../@types/user';

interface IUpdateInfosProps {
  user?: IUser;
  errors: IUserUpdateError;
  handleUserDatasUpdate(event: React.FormEvent<HTMLFormElement>): Promise<void>;
}

function UpdateInfos({
  user,
  errors,
  handleUserDatasUpdate,
}: IUpdateInfosProps) {
  return (
    <form onSubmit={handleUserDatasUpdate}>
      <label className="user-update-form-label" htmlFor="name">
        Nom
      </label>
      <input
        className="user-update-form-input"
        type="text"
        id="name"
        name="name"
        defaultValue={user?.name}
      />
      <label className="user-update-form-label" htmlFor="firstname">
        Prénom
      </label>
      <input
        className="user-update-form-input"
        type="text"
        id="firstname"
        name="firstname"
        defaultValue={user?.firstname}
      />
      <label className="user-update-form-label" htmlFor="email">
        Email
      </label>
      <input
        className="user-update-form-input"
        type="email"
        id="email"
        name="email"
        defaultValue={user?.email}
      />
      <label className="user-update-form-label" htmlFor="old-password">
        Mot de passe actuel <em>*</em>
      </label>
      <input
        className="user-update-form-input"
        type="password"
        id="old-password"
        name="current-password"
      />
      {errors.password && (
        <p className="register-form-error">{errors.password}</p>
      )}
      <button className="user-update-form-button" type="submit">
        Modifier
      </button>
    </form>
  );
}

export default UpdateInfos;
