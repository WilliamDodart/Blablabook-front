import type { IUser } from '../@types/user';
import './Navbar.scss';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import type { IBooks } from '../@types/books';
import axios from 'axios';




interface INavbarProps {
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

function Navbar({
  setDisplayRegisterForm,
  setDisplayLoginForm,
  isLogged,
  setIsLogged,
  setUser,
}: INavbarProps) {

  const [menuBurger, setMenuBurger] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IBooks[]>([]);


  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.trim().length < 1) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/books');
        const filtered = res.data.filter((book: IBooks) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn.toString().includes(searchTerm.toLowerCase())||
          book.editor.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };

    fetchResults();
  }, [searchTerm]);


  return (
    <nav className="navbar">
      <div id="logo">
        <Link to="">
          <img src="../Pictures/Logo.png" alt="" className="header-logo" />
        </Link>
      </div>
      {isLogged ? (
        <div className="search-container">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Recherche par titre, auteur, ISBN ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm.length > 0 && searchResults.length > 0 && (
            <ul className="search-result">
              {searchResults.map((book) => (
                <Link
                  to={`/book/${book.id}`}
                  key={book.id}
                  className="book-result"
                  onClick={() => {
                    setSearchTerm('');
                    setSearchResults([]);
                  }}
                >
                  {book.title} — {book.author}
                </Link>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h1 className="title-blablabook">BlaBla Book</h1>
      )}

      <div id="menu">
        <ul className={menuBurger ? '' : 'hidden'}>
          <li>
            <Link to="/">Accueil</Link>
          </li>

          <li>
            <Link to="/books">Livres</Link>
          </li>

          <li>
            <Link to="/myLibrary">Bibliothèque</Link>
          </li>
          {isLogged ? (
            <>
              <li>
                <Link to="#" className="button-connect">
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="button-connect"
                  onClick={() => {
                    setIsLogged(false);
                    setUser(undefined);
                  }}
                >
                  Se déconnecter
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="#"
                  className="button-connect"
                  onClick={() => {
                    setDisplayLoginForm(true);
                  }}
                >
                  Se connecter
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="create-account"
                  onClick={() => {
                    setDisplayRegisterForm(true);
                  }}
                >
                  Créer un compte
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <Link
        to="#"
        className="burger-menu"
        onClick={(e) => {
          e.preventDefault();
          setMenuBurger(!menuBurger);
        }}
      >
        <img
          src="../public/Pictures/iconamoon--menu-burger-horizontal-fill.svg"
          alt="Menu"
        />
      </Link>
    </nav>
  );
}

export default Navbar;
