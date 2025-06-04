import { useCallback, useEffect, useState } from 'react';
import type { IBooks } from '../../@types/books';
import api from '../../utils/axiosApi';
import './Admin.scss';
import AddBook from '../../components/Admin/AddBook';
import DeleteBook from '../../components/Admin/DeleteBook';
import Header from '../../components/Admin/Header';
import UpdateBook from '../../components/Admin/UpdateBook';
import Loader from '../../components/Loader/Loader';
import ConfirmModal from '../../components/Modals/Confirm/ConfirmModal';
import DeleteBookModal from '../../components/Modals/Delete/DeleteBookModal';

function Admin() {
  const [adminChoice, setAdminChoice] = useState('Ajouter un livre');
  const [allBooks, setAllBooks] = useState<IBooks[]>([]);
  const [allGenres, setAllGenres] = useState([]);
  const [currentBookIDtoUpdate, setCurrentBookIDtoUpdate] = useState<number>();

  const [updateBookState, setUpdateBookState] = useState({
    image: 'https://m.media-amazon.com/images/I/6155jsTHk1L._SL1499_.jpg',
    title: '',
    author: '',
    publication_year: Number(''),
    editor: '',
    isbn: Number(''),
    pages: Number(''),
    // genre1: "",
    // genre2: "",
    summary: '',
  });

  //Display confirmation modals
  const [displayDeleteBookModal, setDisplayDeleteBookModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState('');

  //For fading title animation
  const [displayedChoice, setDisplayedChoice] = useState('');
  const [fadeClass, setFadeClass] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const getAllBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/books');
      setAllBooks(response.data);
      setIsLoading(false);
    } catch (_error) {}
  }, []);

  const getAllGenres = useCallback(async () => {
    try {
      const response = await api.get('/genres');
      setAllGenres(response.data);
    } catch (_error) {}
  }, []);

  //API call to get all the books in the DB when page first loading only
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

  function closeConfirmDeleteBookModal() {
    setDisplayDeleteBookModal(false);
    setUpdateBookState({
      image: 'https://m.media-amazon.com/images/I/6155jsTHk1L._SL1499_.jpg',
      title: '',
      author: '',
      publication_year: Number(''),
      editor: '',
      isbn: Number(''),
      pages: Number(''),
      summary: '',
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="admin-page-section section">
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

      {displayDeleteBookModal && (
        <DeleteBookModal
          closeConfirmDeleteBookModal={closeConfirmDeleteBookModal}
          currentBookIDtoUpdate={currentBookIDtoUpdate}
          setIsLoading={setIsLoading}
          setAllBooks={setAllBooks}
        />
      )}

      <div className="admin-container">
        <Header adminChoice={adminChoice} setAdminChoice={setAdminChoice} />

        <div className="admin-body">
          <p className={`admin-subtitle fade ${fadeClass}`}>
            {displayedChoice}
          </p>

          {adminChoice === 'Ajouter un livre' && (
            <AddBook setConfirmModal={setConfirmModal} allGenres={allGenres} />
          )}

          {adminChoice === 'Modifier un livre' && (
            <UpdateBook
              allBooks={allBooks}
              allGenres={allGenres}
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
      </div>
    </section>
  );
}

export default Admin;
