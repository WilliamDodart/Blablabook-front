import { NavLink } from 'react-router';
import './SubHeader.scss';

interface IAdminHeaderProps {
  title: string;
  sections: string[];
  sectionChoice: string;
  setSectionChoice: React.Dispatch<React.SetStateAction<string>>;
}

function SubHeader({
  title,
  sections,
  sectionChoice,
  setSectionChoice,
}: IAdminHeaderProps) {
  //Changing section handler
  function handleClick(event: React.MouseEvent, choice: string) {
    event.preventDefault();
    setSectionChoice(choice);
  }

  return (
    <div className="sub-header">
      <h1 className="sub-header-title">{title}</h1>
      <ul className="sub-header-list">
        {sections.map((section) => (
          <li key={section}>
            <NavLink
              to=""
              onClick={(event) => handleClick(event, section)}
              className={`sub-header-list-link${
                sectionChoice === section ? ' selected-status' : ''
              }`}
            >
              {section}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubHeader;
