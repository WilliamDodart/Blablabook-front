import { useState } from 'react';
import type { IBooks, ILibrary } from '../../@types/books';
import type { IUser } from '../../@types/user';
import LoginForm from './Authentification/LoginForm';
import RegisterForm from './Authentification/RegisterForm';
import ModalBooks from './ModalBooks/ModalBooks';
import ModalLibrary from './ModalLibrary/ModalLibrary';
import ReviewModal from './ReviewModal/ReviewModal';

interface IModalsManagerProps {
  displayRegisterForm: boolean;
  displayLoginForm: boolean;
  displayModalLibrary: boolean;
  displayModalBook: boolean;
  currentBook: IBooks | null | undefined;
  myLibraries: ILibrary[];
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayModalLibrary: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setMyLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
  setCurrentLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
  setReviewed: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalsManager({
  displayRegisterForm,
  displayLoginForm,
  displayModalLibrary,
  displayModalBook,
  currentBook,
  myLibraries,
  setDisplayLoginForm,
  setUser,
  setIsLogged,
  setDisplayRegisterForm,
  setMyLibraries,
  setCurrentLibraries,
  setDisplayModalLibrary,
  setDisplayModalBook,
  setReviewed,
}: IModalsManagerProps) {
  const [displayReviewModal, setDisplayReviewModal] = useState(false);

  return (
    <>
      {displayRegisterForm && (
        <RegisterForm
          setDisplayRegisterForm={setDisplayRegisterForm}
          setDisplayLoginForm={setDisplayLoginForm}
        />
      )}

      {displayLoginForm && (
        <LoginForm
          setUser={setUser}
          setIsLogged={setIsLogged}
          setDisplayRegisterForm={setDisplayRegisterForm}
          setDisplayLoginForm={setDisplayLoginForm}
          setMyLibraries={setMyLibraries}
        />
      )}

      {displayModalLibrary && (
        <ModalLibrary
          setDisplayModalLibrary={setDisplayModalLibrary}
          currentBook={currentBook}
          setMyLibraries={setMyLibraries}
          myLibraries={myLibraries}
          setCurrentLibraries={setCurrentLibraries}
        />
      )}

      {displayModalBook && (
        <ModalBooks
          setDisplayModalBook={setDisplayModalBook}
          currentBook={currentBook}
          setMyLibraries={setMyLibraries}
          myLibraries={myLibraries}
          displayReviewModal={displayReviewModal}
          setDisplayReviewModal={setDisplayReviewModal}
        />
      )}

      {displayReviewModal && (
        <ReviewModal
          setDisplayReviewModal={setDisplayReviewModal}
          setDisplayModalBook={setDisplayModalBook}
          setReviewed={setReviewed}
          currentBook={currentBook}
        />
      )}
    </>
  );
}

export default ModalsManager;
