import { useEffect, useState } from 'react';
import '../Books/Books.scss';
import './PersonalLibrary.scss';
import type { IBooks, ILibrary } from '../../@types/books';
import Loader from '../../components/Loader/Loader';
import FilterSection from '../../components/PersonalLibrary/FilterSection';
import Libraries from '../../components/PersonalLibrary/Libraries';
import PersonalLibraryHeader from '../../components/PersonalLibrary/PersonalLibraryHeader';
import api from '../../utils/axiosApi';
import extractUniqueGenres from '../../utils/personalLibraryHelper';

interface PersonalLibraryProps {
  setDisplayModalLibrary: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
  myLibraries: ILibrary[];
  setMyLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
  currentLibraries: ILibrary[];
  setCurrentLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
}

function PersonalLibrary({
  myLibraries,
  currentLibraries,
  setCurrentBook,
  setMyLibraries,
  setCurrentLibraries,
  setDisplayModalLibrary,
}: PersonalLibraryProps) {
  const [librariesStatus, setLibrariesStatus] = useState('all');
  const [displayFilter, setDisplayFilter] = useState(false);
  const [currentGenres, setCurrentGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Call API
  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/libraries/books');
        setMyLibraries(response.data);
        setCurrentLibraries(response.data);
        const uniqueGenres = extractUniqueGenres(response.data);
        setCurrentGenres(uniqueGenres);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des bibliothèques',
          error,
        );
        setError('Erreur lors de la récupération des bibliothèques');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibraries();
  }, [setCurrentLibraries, setMyLibraries]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="personal-library">
      <PersonalLibraryHeader
        librariesStatus={librariesStatus}
        setLibrariesStatus={setLibrariesStatus}
        displayFilter={displayFilter}
        setDisplayFilter={setDisplayFilter}
      />

      <div className="personal-library-background">
        <FilterSection
          myLibraries={myLibraries}
          currentGenres={currentGenres}
          displayFilter={displayFilter}
          setMyLibraries={setMyLibraries}
          setCurrentLibraries={setCurrentLibraries}
        />

        {currentLibraries.map((library) => {
          return (
            <Libraries
              key={library.id}
              library={library}
              librariesStatus={librariesStatus}
              setDisplayModalLibrary={setDisplayModalLibrary}
              setCurrentBook={setCurrentBook}
            />
          );
        })}
      </div>
    </section>
  );
}

export default PersonalLibrary;
