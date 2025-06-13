import type { IUser } from '../../@types/user';
import './Navbar.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { IBooks } from '../../@types/books';
import api from '../../utils/axiosApi';
import SearchBar from '../../components/Nav/SearchBar';
import GuestMenu from '../../components/Nav/GuestMenu';
import UserMenu from '../../components/Nav/UserMenu';

interface INavbarProps {
  user: IUser | undefined;
  isLogged: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({
  user,
  isLogged,
  setUser,
  setIsLogged,
  setDisplayRegisterForm,
  setDisplayLoginForm,
}: INavbarProps) {
  const [menuBurger, setMenuBurger] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IBooks[]>([]);

  useEffect(() => {
    async function fetchResults() {
      if (searchTerm.trim().length < 1) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await api.get('/books');
        const filtered = response.data.filter(
          (book: IBooks) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.isbn.toString().includes(searchTerm.toLowerCase()) ||
            book.editor.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setSearchResults(filtered.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    }

    fetchResults();
  }, [searchTerm]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="../Pictures/Logo2.png"
            alt="Logo du site Blabla Book"
            className="navbar-logo-img"
          />
        </Link>
      </div>

      {isLogged ? (
        <SearchBar
          searchResults={searchResults}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSearchResults={setSearchResults}
        />
      ) : (
        <h1 className="navbar-title">BlaBla Book</h1>
      )}

      <div>
        <ul className={menuBurger ? 'navbar-menu' : 'navbar-menu hidden'}>
          <GuestMenu
            isLogged={isLogged}
            setDisplayLoginForm={setDisplayLoginForm}
            setMenuBurger={setMenuBurger}
          />

          <UserMenu
            user={user}
            isLogged={isLogged}
            setUser={setUser}
            setIsLogged={setIsLogged}
            setMenuBurger={setMenuBurger}
            setDisplayLoginForm={setDisplayLoginForm}
            setDisplayRegisterForm={setDisplayRegisterForm}
          />
        </ul>
      </div>

      <Link
        to=""
        className="navbar-burger-menu"
        onClick={(e) => {
          e.preventDefault();
          setMenuBurger(!menuBurger);
        }}
      >
        {!menuBurger && <img src="../Pictures/burgerMenu.svg" alt="Menu" />}
        {menuBurger && <img src="../Pictures/burgerCross.svg" alt="Menu" />}
      </Link>
    </nav>
  );
}

export default Navbar;
