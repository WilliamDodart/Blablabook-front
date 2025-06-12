import { useCallback, useEffect, useState } from 'react';
import type { IGenre, ILibrary } from '../../@types/books';
import type { FilterState } from '../../@types/libraries';
import api from '../../utils/axiosApi';
import './FilterSection.scss';

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
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newLibraryName = formData.get('newLibraryName') as string;
    try {
      const response = await api.post('/library', {
        name: newLibraryName,
      });
      const newLibrary = response.data;

      setMyLibraries((previousLibraries) => [
        ...previousLibraries,
        { ...newLibrary, Books: [] },
      ]);
      setCurrentLibraries((previousLibraries) => [
        ...previousLibraries,
        { ...newLibrary, Books: [] },
      ]);

      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire", error);
    }
  }

  // Filter function
  const applyFilters = useCallback(() => {
    let filteredLibraries = [...myLibraries];

    if (filter.libraryId !== 'all') {
      filteredLibraries = filteredLibraries.filter(
        (library) => library.id === Number(filter.libraryId),
      );
    }

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
            id="newLibraryName"
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
