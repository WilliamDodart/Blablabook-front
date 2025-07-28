import { useCallback, useEffect, useState } from 'react';
import type { IGenre, ILibrary } from '../../@types/books';
import type { FilterState } from '../../@types/libraries';
import api from '../../utils/axiosApi';
import './FilterSection.scss';
import { errorToast, successToast } from '../../utils/toast';

interface IFilterSectionProps {
  myLibraries: ILibrary[];
  currentGenres: string[];
  displayFilter: boolean;
  setMyLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
  setCurrentLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
}

function FilterSection({
  myLibraries,
  currentGenres,
  displayFilter,
  setMyLibraries,
  setCurrentLibraries,
}: IFilterSectionProps) {
  const [filter, setFilter] = useState<FilterState>({
    libraryId: 'all',
    genre: 'all',
  });

  // Library creation
  async function handleLibraryCreation(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    //Récupération des données du formulaire
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newLibraryName = formData.get('newLibraryName') as string;

    //Appel API
    try {
      const response = await api.post('/library', {
        name: newLibraryName,
      });
      const newLibrary = response.data;

      //Mise à jour des bibliothèques de l'utilisateur
      setMyLibraries((previousLibraries) => [
        ...previousLibraries,
        { ...newLibrary, Books: [] },
      ]);
      setCurrentLibraries((previousLibraries) => [
        ...previousLibraries,
        { ...newLibrary, Books: [] },
      ]);

      form.reset();
      successToast(`Bibliothèque '${newLibraryName}' ajoutée`);
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire", error);
      errorToast('Échec de la création de la bibliothèque.');
    }
  }

  // Filter function
  const applyFilters = useCallback(() => {
    //Création d'un tableau indépendant grâce au spread operator
    let filteredLibraries = [...myLibraries];

    //Vérification de la valeur du useState pour le premier filtre
    if (filter.libraryId !== 'all') {
      filteredLibraries = filteredLibraries.filter(
        (library) => library.id === Number(filter.libraryId),
      );
    }

    //Vérification de la valeur du useState pour le second filtre
    if (filter.genre !== 'all') {
      filteredLibraries = filteredLibraries.map((library) => {
        const filteredBooks = library.Books.filter((book) =>
          book.Genres.some((genre: IGenre) => genre.name === filter.genre),
        );
        return {
          ...library,
          Books: filteredBooks,
        };
      });
    }

    //Mise à jour de la valeur utilisé pour l'affichage des bibliothèques et des livres
    setCurrentLibraries(filteredLibraries);
  }, [myLibraries, filter, setCurrentLibraries]);

  //Filter form handler
  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  }

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className={`filter ${displayFilter && 'active'}`}>
      <div className="filter-section">
        <p className="filter-section-text">Filter par :</p>
        <div className="filter-section-library">
          <p className="filter-section-library-label">Bibliothèque</p>
          <select
            name="libraryId"
            onChange={handleFilterChange}
            value={filter.libraryId}
          >
            <option value="all">Toutes</option>
            {myLibraries.map((library) => (
              <option key={library.id} value={library.id}>
                {library.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section-genres">
          <p className="filter-section-genres-label">Genre</p>
          <select
            name="genre"
            onChange={handleFilterChange}
            value={filter.genre}
          >
            <option value="all">Tous</option>
            {currentGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <form className="filter-section-form" onSubmit={handleLibraryCreation}>
          <input
            className="filter-section-form-input"
            type="text"
            aria-label="Nom de la nouvelle bibliothèque"
            name="newLibraryName"
            placeholder="Créer une bibliothèque"
            required
          />
          <button className="filter-section-form-button" type="submit">
            Créer
          </button>
        </form>
      </div>
    </div>
  );
}

export default FilterSection;
