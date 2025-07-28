import { useEffect, useState } from 'react';
import type { IBooks } from '../../@types/books';
import './Homepage.scss';
import type { IUser } from '../../@types/user';
import CallToAction from '../../components/Homepage/CallToAction';
import HeroSection from '../../components/Homepage/HeroSection';
import InfoSection from '../../components/Homepage/InfoSection';
import InspirationSection from '../../components/Homepage/InspirationSection';
import ParagraphSection from '../../components/Homepage/ParagraphSection';
import PersonalSection from '../../components/Homepage/PersonalSection';
import api from '../../utils/axiosApi';

interface HomepageProps {
  isLogged: boolean;
  user: IUser | undefined;
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
}

function Homepage({
  setDisplayRegisterForm,
  isLogged,
  user,
  setDisplayLoginForm,
  setDisplayModalBook,
  setCurrentBook,
}: HomepageProps) {
  const [randomBooks, setRandomBooks] = useState<IBooks[]>([]);

  useEffect(() => {
    const getRandomBooks = async () => {
      try {
        const response = await api.get('/random-books');
        setRandomBooks(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres', error);
      }
    };
    getRandomBooks();
  }, []);

  function clickButtonHomePage() {
    setDisplayRegisterForm(true);
  }

  return (
    <div className="homepage">
      <HeroSection
        isLogged={isLogged}
        user={user}
        clickButtonHomePage={clickButtonHomePage}
      />

      <PersonalSection />

      <InspirationSection
        randomBooks={randomBooks}
        isLogged={isLogged}
        setDisplayLoginForm={setDisplayLoginForm}
        setCurrentBook={setCurrentBook}
        setDisplayModalBook={setDisplayModalBook}
      />

      <ParagraphSection />

      <InfoSection />

      <CallToAction
        isLogged={isLogged}
        user={user}
        clickButtonHomePage={clickButtonHomePage}
      />
    </div>
  );
}

export default Homepage;
