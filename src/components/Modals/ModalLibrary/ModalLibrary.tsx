import { useState } from 'react';
import type { IBooks, ILibrary } from '../../../@types/books';
import api from '../../../utils/axiosApi';
import './ModalLibrary.scss';

type IModalLibraryProps = {
  currentBook: IBooks | null | undefined;
  myLibraries: ILibrary[];
  setMyLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
  setCurrentLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
  setDisplayModalLibrary: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalLibrary({
  currentBook,
  myLibraries,
  setMyLibraries,
  setCurrentLibraries,
  setDisplayModalLibrary,
}: IModalLibraryProps) {
  const [menuDeroulant, setMenuDeroulant] = useState(false);

  //Change status of book
  async function editBookStatus() {
    const response = await api.patch(
      `/library/${currentBook?.LibraryBook.library_id}/book/${currentBook?.id}`,
    );
    setMyLibraries(response.data);
    setCurrentLibraries(response.data);
    setDisplayModalLibrary(false);
  }

  //Delete book from Library
  async function deleteBookFromLibrary() {
    try {
      const response = await api.delete(
        `/library/${currentBook?.LibraryBook.library_id}/book/${currentBook?.id}`,
      );
      setMyLibraries(response.data);
      setCurrentLibraries(response.data);
      setDisplayModalLibrary(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du livre', error);
    }
  }

  // Change book of library
  async function changeLibrary(newLibraryId: number) {
    try {
      const response = await api.patch(
        `/library/${currentBook?.LibraryBook.library_id}/book/${currentBook?.id}/newLibrary/${newLibraryId}`,
      );
      setMyLibraries(response.data);
      setCurrentLibraries(response.data);
      setDisplayModalLibrary(false);
    } catch (error) {
      console.error('Erreur lors du changement de bibliothèque', error);
    }
  }

  return (
    <div className="hidden-background">
      <div className="library">
        <button
          type="button"
          onClick={() => setDisplayModalLibrary(false)}
          className="library-closeBtn"
        >
          <img src="../Pictures/gridicons--cross.svg" alt="Fermer la fenêtre" />
        </button>

        <ul className="library-menu">
          <li
            className={
              currentBook?.LibraryBook.read
                ? 'library-menu-li selected'
                : 'library-menu-li'
            }
          >
            <button
              type="button"
              onClick={(event) => {
                if (!currentBook?.LibraryBook.read) {
                  editBookStatus();
                  return;
                }
                event.stopPropagation();
              }}
            >
              {' '}
              <img
                className="library-menu-li-img"
                src="../Pictures/ph--book-open.svg"
                alt=""
              />
              <p className="library-menu-li-text">Livre lu</p>
            </button>
          </li>
          <li
            className={
              !currentBook?.LibraryBook.read
                ? 'library-menu-li selected'
                : 'library-menu-li'
            }
          >
            <button
              type="button"
              onClick={(event) => {
                if (currentBook?.LibraryBook.read) {
                  editBookStatus();
                  return;
                }
                event.stopPropagation();
              }}
            >
              {' '}
              <img
                className="library-menu-li-img"
                src="../Pictures/tdesign--time.svg"
                alt=""
              />
              <p className="library-menu-li-text">A lire </p>
            </button>
          </li>
          <li className="library-menu-li">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                deleteBookFromLibrary();
              }}
            >
              <img
                className="library-menu-li-img"
                src="../Pictures/tabler--trash.svg"
                alt=""
              />
              <p className="library-menu-li-text">Supprimer</p>
            </button>
          </li>
          <li className="library-menu-li">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setMenuDeroulant(!menuDeroulant);
              }}
            >
              <img
                className="library-menu-li-img"
                src="../Pictures/material-symbols--change-circle-rounded.svg"
                alt=""
              />
              <p className="library-menu-li-text">Changer de bibliothèque</p>
            </button>
            {menuDeroulant && (
              <button
                type="button"
                className="library-change"
                onClick={(event) => event.stopPropagation()}
              >
                <select
                  onChange={(event) => {
                    const newLibraryId = Number.parseInt(event.target.value);
                    changeLibrary(newLibraryId);
                  }}
                >
                  <option value="">Choisir une bibliothèque</option>
                  {myLibraries
                    .filter(
                      (lib) => lib.id !== currentBook?.LibraryBook.library_id,
                    )
                    .map((library) => (
                      <option key={library.id} value={library.id}>
                        {library.name}
                      </option>
                    ))}
                </select>
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ModalLibrary;
