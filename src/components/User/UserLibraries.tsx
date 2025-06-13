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
    <div className="profile-libraries">
      <p className="profile-libraries-title">Mes bibliothèques</p>

      <ul className="profile-libraries-list">
        {user?.Libraries?.map((library, index) => {
          return (
            <li
              key={library.id}
              className="profile-library"
              style={{
                animationDelay: `${index * 70}ms`,
              }}
            >
              <Link to={'/myLibrary'} className="profile-library-link ">
                <figure>
                  <div className="profile-library-cover">
                    {library.Books[0]?.image ? (
                      <img src={library.Books[0].image} alt="Couverture d'un livre de la bibliothèque" />
                    ) : (
                      <div className="profile-library-cover-empty">
                        <p>
                          Il n'y a pas encore de livre dans cette bibliothèque.
                          Ajoutez en un !
                        </p>
                        <p className="add-button">
                          <em>+</em> Ajouter
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <figcaption className="profile-library-name">
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
                    className="profile-library-rename"
                    onChange={(e) => setNewLibraryName(e.target.value)}
                    required
                  />
                  <button className="validate-button" type="submit">
                    Valider
                  </button>
                </form>
              ) : (
                <button
                  className="update-button"
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
                className="delete-button"
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
