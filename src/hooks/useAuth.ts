import { useEffect, useState } from 'react';
import type { ILibrary } from '../@types/books';
import type { IUser } from '../@types/user';
import api from '../utils/axiosApi';

export function useAuth() {
  const [user, setUser] = useState<IUser | undefined>();
  const [isLogged, setIsLogged] = useState(false);
  const [myLibraries, setMyLibraries] = useState<ILibrary[]>([]);
  const [currentLibraries, setCurrentLibraries] = useState(myLibraries);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function getUser() {
      try {
        const response = await api.get('/user');
        setUser(response.data);
        setMyLibraries(response.data.Libraries);
      } catch (_error) {
        localStorage.removeItem('token');
        setIsLogged(false);
        setUser(undefined);
        setMyLibraries([]);
        setCurrentLibraries([]);
      }
    }

    if (token) {
      getUser();
      setIsLogged(true);
    }
  }, []);

  return {
    user,
    isLogged,
    myLibraries,
    currentLibraries,
    setUser,
    setIsLogged,
    setMyLibraries,
    setCurrentLibraries,
  };
}
