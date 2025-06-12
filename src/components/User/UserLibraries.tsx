import { useState } from 'react';
import { Link } from 'react-router';
import type { IUser } from '../../@types/user';
import api from '../../utils/axiosApi';

interface IUserLibrariesProps {
  user?: IUser;
  getUser: () => Promise<void>;
  setLibraryId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setDisplayDeleteLibraryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserLibraries({
  user,
  setLibraryId,
  getUser,
  setDisplayDeleteLibraryModal,
}: IUserLibrariesProps) {
  const [editingLibraryId, setEditingLibraryId] = useState<number | null>(null);
  const [newLibraryName, setNewLibraryName] = useState('');

  async function renameLibrary(
    event: React.FormEvent<HTMLFormElement>,
    id: number,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      await api.patch(`/library/${id}`, {
        name: formData.get('library-rename-input'),
      });
      getUser();
    } catch (error) {
      console.log('Erreur lors du changement de nom de la bibliothèque', error);
    } finally {
      setEditingLibraryId(null);
    }
  }

  function openDeleteLibraryModal(LibraryId: number) {
    setLibraryId(LibraryId);
    setDisplayDeleteLibraryModal(true);
  }

  return (
    <div id="user-libraries-section">
      <p id="user-libraries-section-title">Mes bibliothèques</p>

      <ul id="libraries-list">
        {user?.Libraries?.map((library, index) => {
          return (
            <li
              key={library.id}
              className="animated-library"
              style={{
                animationDelay: `${index * 70}ms`,
              }}
            >
              <Link to={'/myLibrary'}>
                <figure>
                  <div className="book-img">
                    {library.Books[0]?.image ? (
                      <img src={library.Books[0].image} alt="book-image" />
                    ) : (
                      <div className="no-book-img">
                        <p>
                          Il n'y a pas encore de livre dans cette bibliothèque.
                          Ajoutez en un !
                        </p>
                        <p className="addbook-box-btn">
                          <em>+</em> Ajouter
                        </p>
                      </div>
                    )}
                  </div>
                  <figcaption className="library-name">
                    {library.name}
                  </figcaption>
                </figure>
              </Link>

              {editingLibraryId === library.id ? (
                <form
                  onSubmit={(event) => {
                    renameLibrary(event, library.id);
                  }}
                >
                  <input
                    type="text"
                    name="library-rename-input"
                    placeholder={library.name}
                    value={newLibraryName}
                    className="library-rename-input"
                    onChange={(e) => setNewLibraryName(e.target.value)}
                    required
                  />
                  <button className="library-rename" type="submit">
                    Valider
                  </button>
                </form>
              ) : (
                <button
                  className="library-update"
                  type="button"
                  onClick={() => {
                    setEditingLibraryId(library.id);
                    setNewLibraryName(library.name);
                  }}
                >
                  Renommer
                </button>
              )}

              <button
                type="button"
                className="library-delete"
                onClick={() => {
                  openDeleteLibraryModal(library.id);
                }}
              >
                Supprimer
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserLibraries;
