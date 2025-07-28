import { NavLink } from 'react-router';
import './Menu.scss';

interface IGuestMenuProps {
  isLogged: boolean;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuBurger: React.Dispatch<React.SetStateAction<boolean>>;
}

function GuestMenu({
  isLogged,
  setDisplayLoginForm,
  setMenuBurger,
}: IGuestMenuProps) {
  function handleLoggedClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!isLogged) {
      event.preventDefault();
      setDisplayLoginForm(true);
    }
    setMenuBurger(false);
  }
  return (
    <>
      <li className="guest-menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive && isLogged ? 'active guest-menu-link' : 'guest-menu-link'
          }
          onClick={() => setMenuBurger(false)}
        >
          Accueil
        </NavLink>
      </li>

      <li className="guest-menu">
        <NavLink
          to={isLogged ? '/books' : ''}
          className={({ isActive }) =>
            isActive && isLogged ? 'active guest-menu-link' : 'guest-menu-link'
          }
          onClick={(event) => handleLoggedClick(event)}
        >
          Livres
        </NavLink>
      </li>

      <li className="guest-menu">
        <NavLink
          to={isLogged ? '/myLibrary' : ''}
          className={({ isActive }) =>
            isActive && isLogged ? 'active guest-menu-link' : 'guest-menu-link'
          }
          onClick={(event) => handleLoggedClick(event)}
        >
          Bibliothèque
        </NavLink>
      </li>
    </>
  );
}

export default GuestMenu;
