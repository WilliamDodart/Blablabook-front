import { useState } from 'react';
import type { IBooks, ILibrary } from '../../../@types/books';
import './ModalBooks.scss';
import api from '../../../utils/axiosApi';
import { errorToast, successToast } from '../../../utils/toast';

type IModalBooksProps = {
  currentBook: IBooks | null | undefined;
  myLibraries: ILibrary[];
  setDisplayReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalBooks({
  currentBook,
  myLibraries,
  setDisplayModalBook,
  setDisplayReviewModal,
}: IModalBooksProps) {
  const [menuDeroulant, setMenuDeroulant] = useState<string | null>(null);

  const handleClick = (type: 'read' | 'toRead') => {
    setMenuDeroulant((menu) => (menu === type ? null : type));
  };

  const handleSelectLibrary = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: 'read' | 'toRead',
  ) => {
    const selectedLibraryId = Number(event.target.value);
    if (!selectedLibraryId || !currentBook) return;

    const selectedLibrary = myLibraries.find(
      (lib) => lib.id === selectedLibraryId,
    );
    const bookExists = selectedLibrary?.Books.some(
      (book) => book.id === currentBook.id,
    );

    if (bookExists) {
      errorToast('Ce livre est déjà présent dans cette bibliothèque.');
      return;
    }

    try {
      await api.post(`/library/${selectedLibraryId}/book/${currentBook.id}`, {
        read: type === 'read',
      });
      setDisplayModalBook(false);
      successToast('Livre ajouté !');
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout du livre à la bibliothèque :",
        error,
      );
    }
  };

  function handleReviewModal() {
    setDisplayModalBook(false);
    setDisplayReviewModal(true);
  }

  return (
    <div className="hidden-background">
      <div
        className="library"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setDisplayModalBook(false)}
          className="library-closeBtn"
        >
          <img src="../Pictures/gridicons--cross.svg" alt="close-button" />
        </button>
        <ul className="library-menu">
          <button
            type="button"
            className="library-menu-li"
            onClick={() => handleClick('read')}
          >
            <img
              className="library-menu-li-img"
              src="../Pictures/ph--book-open.svg"
              alt=""
            />
            <p className="library-menu-li-text">Livre lus</p>
            {menuDeroulant === 'read' && (
              <select
                className="library-select"
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => handleSelectLibrary(event, 'read')}
                onKeyDown={(event) => event.stopPropagation()}
              >
                <option value="">Choisir une bibliothèque</option>
                {myLibraries.map((library) => (
                  <option key={library.id} value={library.id}>
                    {library.name}
                  </option>
                ))}
              </select>
            )}
          </button>

          <button
            type="button"
            className="library-menu-li"
            onClick={() => handleClick('toRead')}
          >
            <img
              className="library-menu-li-img"
              src="../Pictures/tdesign--time.svg"
              alt=""
            />
            <p className="library-menu-li-text">A lire</p>
            {menuDeroulant === 'toRead' && (
              <select
                className="library-select"
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => handleSelectLibrary(event, 'toRead')}
                onKeyDown={(event) => event.stopPropagation()}
              >
                <option value="">Choisir une bibliothèque</option>
                {myLibraries.map((library) => (
                  <option key={library.id} value={library.id}>
                    {library.name}
                  </option>
                ))}
              </select>
            )}
          </button>

          <button
            type="button"
            className="library-menu-li"
            onClick={handleReviewModal}
          >
            <img
              className="library-menu-li-img"
              src="../Pictures/stash--star-duotone.svg"
              alt=""
            />
            <p className="library-menu-li-text">Noter</p>
          </button>

          <button
            type="button"
            className="library-menu-li"
            onClick={handleReviewModal}
          >
            <img
              className="library-menu-li-img"
              src="../Pictures/mdi--dialogue-outline.svg"
              alt=""
            />
            <p className="library-menu-li-text">Laisser un avis</p>
          </button>
        </ul>
      </div>
    </div>
  );
}

export default ModalBooks;
