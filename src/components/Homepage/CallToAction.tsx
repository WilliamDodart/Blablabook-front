import { Link } from 'react-router';
import type { IUser } from '../../@types/user';

interface ICallToActionProps {
  isLogged: boolean;
  user: IUser | undefined;
  clickButtonHomePage(): void;
}

function CallToAction({
  isLogged,
  user,
  clickButtonHomePage,
}: ICallToActionProps) {
  return (
    <section className="call-to-action-section">
      {isLogged && user?.firstname ? (
        <h2>Bienvenue chez BlaBla Book, {user.firstname} !</h2>
      ) : (
        <h2>Rejoignez notre communauté littéraire</h2>
      )}

      {isLogged ? (
        <Link to="/myLibrary" className="call-to-action-section-button">
          Accéder à ma bibliothèque
        </Link>
      ) : (
        <button
          type="button"
          onClick={clickButtonHomePage}
          className="call-to-action-section-button"
        >
          Commencer ici
        </button>
      )}
    </section>
  );
}

export default CallToAction;
