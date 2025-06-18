import './App.scss';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import type { IBooks } from './@types/books';
import ModalsManager from './components/Modals/ModalsManager';
import { useAuth } from './hooks/useAuth';
import Footer from './layouts/Footer/Footer';
import Navbar from './layouts/Navbar/Navbar';
import Admin from './pages/Admin/Admin';
import Book from './pages/Book/Book';
import Books from './pages/Books/Books';
import Confidentalite from './pages/Confidentalité/Confidentalite';
import Contact from './pages/Contact/Contact';
import Error from './pages/Error404/Error404';
import Homepage from './pages/Homepage/Homepage';
import MentionLegale from './pages/MentionLegales/MentionLegale';
import PersonalLibrary from './pages/PersonalLibrary/PersonalLibrary';
import User from './pages/User/User';

function App() {
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [displayModalLibrary, setDisplayModalLibrary] = useState(false);
  const [displayModalBook, setDisplayModalBook] = useState(false);
  const [currentBook, setCurrentBook] = useState<IBooks | null>();
  const [reviewed, setReviewed] = useState(false);

  const {
    user,
    isLogged,
    myLibraries,
    currentLibraries,
    setUser,
    setIsLogged,
    setMyLibraries,
    setCurrentLibraries,
  } = useAuth();

  return (
    <div className="app">
      <ModalsManager
        displayRegisterForm={displayRegisterForm}
        displayLoginForm={displayLoginForm}
        displayModalLibrary={displayModalLibrary}
        displayModalBook={displayModalBook}
        currentBook={currentBook}
        myLibraries={myLibraries}
        setDisplayLoginForm={setDisplayLoginForm}
        setDisplayRegisterForm={setDisplayRegisterForm}
        setDisplayModalLibrary={setDisplayModalLibrary}
        setDisplayModalBook={setDisplayModalBook}
        setUser={setUser}
        setIsLogged={setIsLogged}
        setMyLibraries={setMyLibraries}
        setCurrentLibraries={setCurrentLibraries}
        setReviewed={setReviewed}
      />

      <Navbar
        setDisplayRegisterForm={setDisplayRegisterForm}
        setDisplayLoginForm={setDisplayLoginForm}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setUser={setUser}
        user={user}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              setDisplayRegisterForm={setDisplayRegisterForm}
              isLogged={isLogged}
              setDisplayLoginForm={setDisplayLoginForm}
              user={user}
              setDisplayModalBook={setDisplayModalBook}
              setCurrentBook={setCurrentBook}
            />
          }
        />

        <Route
          path="/books"
          element={
            <Books
              setDisplayModalBook={setDisplayModalBook}
              setCurrentBook={setCurrentBook}
            />
          }
        />

        <Route
          path="/book/:id"
          element={
            <Book
              setDisplayModalBook={setDisplayModalBook}
              setReviewed={setReviewed}
              reviewed={reviewed}
              user={user}
              setCurrentBook={setCurrentBook}
            />
          }
        />

        <Route
          path="/myLibrary"
          element={
            <PersonalLibrary
              setDisplayModalLibrary={setDisplayModalLibrary}
              setCurrentBook={setCurrentBook}
              myLibraries={myLibraries}
              setMyLibraries={setMyLibraries}
              currentLibraries={currentLibraries}
              setCurrentLibraries={setCurrentLibraries}
            />
          }
        />

        <Route
          path="/user"
          element={
            <User
              user={user}
              setUser={setUser}
              setIsLogged={setIsLogged}
              reviewed={reviewed}
              setReviewed={setReviewed}
            />
          }
        />

        {isLogged && user?.admin && <Route path="/admin" element={<Admin />} />}

        <Route path="/confidentality" element={<Confidentalite />} />

        <Route path="/legal-notice" element={<MentionLegale />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
