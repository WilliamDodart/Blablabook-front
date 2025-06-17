import { useCallback, useEffect, useState } from 'react';
import type { IBooks } from '../../@types/books';
import api from '../../utils/axiosApi';
import './Admin.scss';
import AddBook from '../../components/Admin/AddBook';
import DeleteBook from '../../components/Admin/DeleteBook';
import UpdateBook from '../../components/Admin/UpdateBook';
import Loader from '../../components/Loader/Loader';
import ConfirmModal from '../../components/Modals/Confirm/ConfirmModal';
import DeleteBookModal from '../../components/Modals/Delete/DeleteBookModal';
import SubHeader from '../../components/SubHeader/SubHeader';

function Admin() {
  const [adminChoice, setAdminChoice] = useState('Ajouter un livre');
  const [allBooks, setAllBooks] = useState<IBooks[]>([]);
  const [allGenres, setAllGenres] = useState([]);
  const [currentBookIDtoUpdate, setCurrentBookIDtoUpdate] = useState<number>();
  const [displayDeleteBookModal, setDisplayDeleteBookModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [displayedChoice, setDisplayedChoice] = useState('');
  const [fadeClass, setFadeClass] = useState('');

  //All books API call
  const getAllBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/books');
      setAllBooks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des livres', error);
    }
  }, []);

  //All genres API call
  const getAllGenres = useCallback(async () => {
    try {
      const response = await api.get('/genres');
      setAllGenres(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des genres', error);
    }
  }, []);

  //Group Call
  useEffect(() => {
    getAllBooks();
    getAllGenres();
  }, [getAllBooks, getAllGenres]);

  //Handle fading title animation
  useEffect(() => {
    if (adminChoice !== displayedChoice) {
      setFadeClass('fade-out');
      const timeout = setTimeout(() => {
        setDisplayedChoice(adminChoice);
        setFadeClass('');
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [adminChoice, displayedChoice]);

  //Loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="admin-section">
      {confirmModal === 'add' && (
        <ConfirmModal
          setConfirmModal={setConfirmModal}
          message="Ce livre a bien été ajouté dans la base de données."
        />
      )}

      {confirmModal === 'update' && (
        <ConfirmModal
          setConfirmModal={setConfirmModal}
          message="Ce livre a bien été modifié dans la base de données."
        />
      )}

      {confirmModal === 'delete' && (
        <ConfirmModal
          setConfirmModal={setConfirmModal}
          message="Ce livre a bien été supprimé de la base de données."
        />
      )}

      {displayDeleteBookModal && (
        <DeleteBookModal
          getAllBooks={getAllBooks}
          setDisplayDeleteBookModal={setDisplayDeleteBookModal}
          setConfirmModal={setConfirmModal}
          currentBookIDtoUpdate={currentBookIDtoUpdate}
        />
      )}

      <SubHeader
        title={'Page administrateur'}
        sections={[
          'Ajouter un livre',
          'Modifier un livre',
          'Supprimer un livre',
        ]}
        sectionChoice={adminChoice}
        setSectionChoice={setAdminChoice}
      />

      <div className="admin-section-body">
        <p className={`admin-section-body-subtitle fade ${fadeClass}`}>
          {displayedChoice}
        </p>

        {adminChoice === 'Ajouter un livre' && (
          <AddBook
            setConfirmModal={setConfirmModal}
            allGenres={allGenres}
            getAllBooks={getAllBooks}
            getAllGenres={getAllGenres}
          />
        )}

        {adminChoice === 'Modifier un livre' && (
          <UpdateBook
            allBooks={allBooks}
            allGenres={allGenres}
            getAllBooks={getAllBooks}
            getAllGenres={getAllGenres}
            setConfirmModal={setConfirmModal}
            currentBookIDtoUpdate={currentBookIDtoUpdate}
            setCurrentBookIDtoUpdate={setCurrentBookIDtoUpdate}
          />
        )}

        {adminChoice === 'Supprimer un livre' && (
          <DeleteBook
            allBooks={allBooks}
            setCurrentBookIDtoUpdate={setCurrentBookIDtoUpdate}
            setDisplayDeleteBookModal={setDisplayDeleteBookModal}
          />
        )}
      </div>
    </section>
  );
}

export default Admin;
