import { NavLink } from 'react-router';
import './PersonalLibraryHeader.scss';

type IPersonalLibraryHeaderProps = {
  librariesStatus: string;
  displayFilter: boolean;
  setLibrariesStatus: React.Dispatch<React.SetStateAction<string>>;
  setDisplayFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

function PersonalLibraryHeader({
  librariesStatus,
  displayFilter,
  setLibrariesStatus,
  setDisplayFilter,
}: IPersonalLibraryHeaderProps) {
  //className handler
  const getNavLinkClass = (status: string) =>
    librariesStatus === status
      ? 'personal-library-header-list-link selected-status'
      : 'personal-library-header-list-link';

  //Book status handler
  const handleStatusClick = (status: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setLibrariesStatus(status);
  };

  //Filter button handler
  const handleFilterClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setDisplayFilter(!displayFilter);
  };
  return (
    <div className="personal-library-header">
      <h1 className="personal-library-header-title">Mes bibliothèques</h1>
      <ul className="personal-library-header-list">
        <NavLink
          className="personal-library-header-list-navlink"
          to=""
          onClick={handleStatusClick('all')}
        >
          <li className={getNavLinkClass('all')}>Tous</li>
        </NavLink>
        <NavLink
          className="personal-library-header-list-navlink"
          to=""
          onClick={handleStatusClick('read')}
        >
          <li className={getNavLinkClass('read')}>Lus</li>
        </NavLink>
        <NavLink
          className="personal-library-header-list-navlink"
          to=""
          onClick={handleStatusClick('toRead')}
        >
          <li className={getNavLinkClass('toRead')}>À lire</li>
        </NavLink>
        <button
          className={
            displayFilter
              ? 'personal-library-header-list-button selected-filter'
              : 'personal-library-header-list-button'
          }
          type="button"
          onClick={handleFilterClick}
        >
          ...
        </button>
      </ul>
    </div>
  );
}

export default PersonalLibraryHeader;
