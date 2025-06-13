import { Link, NavLink } from 'react-router';
import type { IUser } from '../../@types/user';

interface IUserMenuProps {
  user: IUser | undefined;
  isLogged: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuBurger: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserMenu({
  user,
  isLogged,
  setUser,
  setIsLogged,
  setMenuBurger,
  setDisplayLoginForm,
  setDisplayRegisterForm,
}: IUserMenuProps) {
  function handleLogOut() {
    localStorage.removeItem('token');
    setIsLogged(false);
    setUser(undefined);
    setMenuBurger(false);
  }
  return (
    <>
      {isLogged ? (
        <>
          <li className="user-menu">
            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive ? 'active user-menu-link' : 'user-menu-link'
              }
              onClick={() => setMenuBurger(false)}
            >
              Profil
            </NavLink>
          </li>
          {user?.admin && (
            <li className="user-menu">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? 'active user-menu-link' : 'user-menu-link'
                }
                onClick={() => setMenuBurger(false)}
              >
                Admin
              </NavLink>
            </li>
          )}
          <li className="user-menu">
            <Link to="/" className="user-menu-link" onClick={handleLogOut}>
              Déconnexion
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="user-menu">
            <Link
              to="#"
              className="user-menu-link"
              onClick={() => {
                setDisplayLoginForm(true);
                setMenuBurger(false);
              }}
            >
              Se connecter
            </Link>
          </li>
          <li className="user-menu">
            <Link
              to="#"
              className="user-menu-link"
              onClick={() => {
                setDisplayRegisterForm(true);
                setMenuBurger(false);
              }}
            >
              Créer un compte
            </Link>
          </li>
        </>
      )}
    </>
  );
}

export default UserMenu;
