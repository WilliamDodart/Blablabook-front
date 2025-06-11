import type { IUserUpdateError } from '../../@types/user';

interface IDeleteUserProps {
  setErrors: React.Dispatch<React.SetStateAction<IUserUpdateError>>;
  setDisplayDeleteUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteUser({
  setErrors,
  setDisplayDeleteUserModal,
}: IDeleteUserProps) {
  function openDeleteUserModal() {
    //Empty the errors state to avoid duplicated error messages when the modal pops up
    setErrors({} as IUserUpdateError);
    setDisplayDeleteUserModal(true);
  }

  return (
    <button
      type="button"
      className="user-delete-button"
      onClick={openDeleteUserModal}
    >
      Supprimer mon compte
    </button>
  );
}

export default DeleteUser;
