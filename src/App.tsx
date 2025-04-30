import './App.scss';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import type { IUser } from './@types/user';
import Book from './Book/Book';
import Books from './Books/Books';
import Footer from './Footer/Footer';
import Homepage from './Homepage/Homepage';
import PersonalLibrary from './PersonalLibrary/PersonalLibrary';
import LoginForm from './LoginForm/LoginForm';
import Navbar from './Navbar/Navbar';
import RegisterForm from './RegisterForm/RegisterForm';


function App() {
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [user, setUser] = useState<IUser | undefined>();
  const [isLogged, setIsLogged] = useState(false);

  function closeRegisterForm() {
    setDisplayRegisterForm(false);
  }

  function closeLoginForm() {
    setDisplayLoginForm(false);
  }

  return (
    <div className="app">
      {displayRegisterForm && (
        <RegisterForm
          closeRegisterForm={closeRegisterForm}
          setDisplayLoginForm={setDisplayLoginForm}
        />
      )}
      {displayLoginForm && (
        <LoginForm
          closeLoginForm={closeLoginForm}
          setUser={setUser}
          setIsLogged={setIsLogged}
          setDisplayRegisterForm={setDisplayRegisterForm}
        />
      )}

      <Navbar
        setDisplayRegisterForm={setDisplayRegisterForm}
        setDisplayLoginForm={setDisplayLoginForm}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setUser={setUser}
      />
      <Routes>

        <Route path="/" element={
          <Homepage setDisplayRegisterForm={setDisplayRegisterForm} />
        } />
        <Route path="/books" element={
          <Books />
        } />
        <Route path="/book/:id" element={
          <Book />
        } />
        <Route path="/myLibrary" element={
          <PersonalLibrary />
        } />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
