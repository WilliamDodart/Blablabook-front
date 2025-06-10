import { NavLink } from 'react-router';
import './PersonalLibraryHeader.scss';

type IPersonalLibraryHeaderProps = {
  librariesStatus: string;
  setLibrariesStatus: React.Dispatch<React.SetStateAction<string>>;
  displayFilter: boolean;
  setDisplayFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

function PersonalLibraryHeader({
  librariesStatus,
  setLibrariesStatus,
  displayFilter,
  setDisplayFilter,
}: IPersonalLibraryHeaderProps) {
  return (
    <div className="personal-library-header">
      <h1 className="personal-library-header-title">Mes bibliothèques</h1>
      <ul className="personal-library-header-list">
        <NavLink
          className="personal-library-header-list-navlink"
          to=""
          onClick={(event) => {
            event.preventDefault();
            setLibrariesStatus('all');
          }}
        >
          <li
            className={
              librariesStatus === 'all'
                ? 'personal-library-header-list-link selected-status'
                : 'personal-library-header-list-link'
            }
          >
            Tous
          </li>
        </NavLink>
        <NavLink
          className="personal-library-header-list-navlink"
          to=""
          onClick={(event) => {
            event.preventDefault();
            setLibrariesStatus('read');
          }}
        >
          <li
            className={
              librariesStatus === 'read'
                ? 'personal-library-header-list-link selected-status'
                : 'personal-library-header-list-link'
            }
          >
            Lus
          </li>
        </NavLink>
        <NavLink
          className="personal-library-header-list-navlink"
          to=""
          onClick={(event) => {
            event.preventDefault();
            setLibrariesStatus('toRead');
          }}
        >
          <li
            className={
              librariesStatus === 'toRead'
                ? 'personal-library-header-list-link selected-status'
                : 'personal-library-header-list-link'
            }
          >
            À lire
          </li>
        </NavLink>
        <button
          className={
            displayFilter
              ? 'personal-library-header-list-button selected-filter'
              : 'personal-library-header-list-button'
          }
          type="button"
          onClick={(event) => {
            event.preventDefault();
            setDisplayFilter(!displayFilter);
          }}
        >
          ...
        </button>
      </ul>
    </div>
  );
}

export default PersonalLibraryHeader;
