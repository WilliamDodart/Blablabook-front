interface IDeleteUserProps {
  setDisplayDeleteUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteUser({ setDisplayDeleteUserModal }: IDeleteUserProps) {
  return (
    <button
      type="button"
      className="user-delete-button"
      onClick={() => setDisplayDeleteUserModal(true)}
    >
      Supprimer mon compte
    </button>
  );
}

export default DeleteUser;
