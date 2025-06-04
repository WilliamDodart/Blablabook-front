import { NavLink } from 'react-router';
import './SubHeader.scss';

interface IAdminHeaderProps {
  adminChoice: string;
  setAdminChoice: React.Dispatch<React.SetStateAction<string>>;
}

function AdminHeader({ adminChoice, setAdminChoice }: IAdminHeaderProps) {
  return (
    <div className="admin-header">
      <h1 className="admin-header-title">Page administrateur</h1>
      <ul className="admin-header-list">
        <li>
          <NavLink
            className={
              adminChoice === 'Ajouter un livre'
                ? 'admin-header-list-link selected-status'
                : 'admin-header-list-link'
            }
            to=""
            onClick={(event) => {
              event.preventDefault();
              setAdminChoice('Ajouter un livre');
            }}
          >
            Ajouter un livre
          </NavLink>
        </li>

        <li>
          <NavLink
            className={
              adminChoice === 'Modifier un livre'
                ? 'admin-header-list-link selected-status'
                : 'admin-header-list-link'
            }
            to=""
            onClick={(event) => {
              event.preventDefault();
              setAdminChoice('Modifier un livre');
            }}
          >
            Modifier un livre
          </NavLink>
        </li>

        <li>
          <NavLink
            className={
              adminChoice === 'Supprimer un livre'
                ? 'admin-header-list-link selected-status'
                : 'admin-header-list-link'
            }
            to=""
            onClick={(event) => {
              event.preventDefault();
              setAdminChoice('Supprimer un livre');
            }}
          >
            Supprimer un livre
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminHeader;
