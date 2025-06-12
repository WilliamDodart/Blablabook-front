import './Confirm.scss';

interface IConfirmModalProps {
  setConfirmModal: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  UserDeleteHandler?(): void;
}

function ConfirmModal({
  setConfirmModal,
  message,
  UserDeleteHandler,
}: IConfirmModalProps) {
  function closeModal() {
    if (UserDeleteHandler) {
      UserDeleteHandler();
    } else {
      setConfirmModal('');
    }
  }
  return (
    <div className="hidden-background">
      <div className="confirm-modal">
        <button
          type="button"
          onClick={closeModal}
          className="confirm-modal-closeBtn"
        >
          <img
            src="../Pictures/gridicons--cross.svg"
            alt="Fermer la fenêtre"
            className="confirm-modal-closeBtn-img"
          />
        </button>
        <img
          className="confirm-modal-caution-icon"
          src="./Pictures/check.png"
          alt="Icone de validation"
        />
        <p className="confirm-modal-message">{message}</p>
      </div>
    </div>
  );
}

export default ConfirmModal;
