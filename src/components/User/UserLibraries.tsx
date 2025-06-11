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
  // On stocke l’id de la bibliothèque que l'on veut modifier pour afficher le formulaire
  const [editingLibraryId, setEditingLibraryId] = useState<number | null>(null);
  // On stocke la valeur de l’input du formulaire
  const [newLibraryName, setNewLibraryName] = useState('');

  async function renameLibrary(
    event: React.FormEvent<HTMLFormElement>,
    id: number,
  ) {
    try {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);

      await api.patch(`/library/${id}`, {
        name: formData.get('library-rename-input'),
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  }

  function openDeleteLibraryModal() {
    setDisplayDeleteLibraryModal(true);
  }

  return (
    <div id="user-libraries-section">
      <p id="user-libraries-section-title">Mes bibliothèques</p>

      <ul id="libraries-list">
        {user?.Libraries?.map((Library, index) => {
          return (
            <li
              key={Library.id}
              className="animated-library"
              style={{
                animationDelay: `${index * 70}ms`,
              }}
            >
              <Link to={'/myLibrary'}>
                <figure>
                  <div className="book-img">
                    {Library.Books[0]?.image ? (
                      <img src={Library.Books[0].image} alt="book-image" />
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
                    {Library.name}
                  </figcaption>
                </figure>
              </Link>

              {editingLibraryId === Library.id ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    renameLibrary(event, Library.id);
                    setEditingLibraryId(null);
                  }}
                >
                  <input
                    type="text"
                    name="library-rename-input"
                    placeholder={Library.name}
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
                    setEditingLibraryId(Library.id);
                    setNewLibraryName(Library.name);
                  }}
                >
                  Renommer
                </button>
              )}

              <button
                type="button"
                className="library-delete"
                onClick={(event) => {
                  event.stopPropagation();
                  setLibraryId(Library.id);
                  openDeleteLibraryModal();
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
