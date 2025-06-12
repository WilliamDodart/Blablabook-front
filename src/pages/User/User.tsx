import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { IUser } from '../../@types/user';
import api from '../../utils/axiosApi';
import './User.scss';
import Loader from '../../components/Loader/Loader';
import ConfirmModal from '../../components/Modals/Confirm/ConfirmModal';
import DeleteLibraryModal from '../../components/Modals/Delete/DeleteLibraryModal';
import DeleteUserModal from '../../components/Modals/Delete/DeleteUserModal';
import SubHeader from '../../components/SubHeader/SubHeader';
import DeleteUser from '../../components/User/DeleteUser';
import Reviews from '../../components/User/Reviews';
import UpdateInfos from '../../components/User/UpdateInfos';
import UpdatePassword from '../../components/User/UpdatePassword';
import UserLibraries from '../../components/User/UserLibraries';

interface IUserProps {
  user?: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  reviewed: boolean;
  setReviewed: React.Dispatch<React.SetStateAction<boolean>>;
}

function User({
  user,
  setUser,
  setIsLogged,
  reviewed,
  setReviewed,
}: IUserProps) {
  const navigate = useNavigate();
  const [confirmModal, setConfirmModal] = useState('');
  const [libraryId, setLibraryId] = useState<number>();
  const [userSection, setUserSection] = useState<string>('Mes informations');
  const [displayedSection, setDisplayedSection] = useState('');
  const [fadeClass, setFadeClass] = useState('');
  const [displayDeleteUserModal, setDisplayDeleteUserModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [displayDeleteLibraryModal, setDisplayDeleteLibraryModal] =
    useState(false);

  //API Call
  const getUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/user');
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur", error);
    }
  }, [setUser]);

  useEffect(() => {
    if (reviewed !== undefined) {
      getUser();
    }
  }, [getUser, reviewed]);

  //Handle fading title animation
  useEffect(() => {
    if (userSection !== displayedSection) {
      setFadeClass('fade-out');
      const timeout = setTimeout(() => {
        setDisplayedSection(userSection);
        setFadeClass('');
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [userSection, displayedSection]);

  //Disconnect the user and redirect him to the homepage
  function UserDeleteHandler() {
    localStorage.removeItem('token');
    setIsLogged(false);
    setUser(undefined);
    setConfirmModal('');
    navigate('/');
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="user-profile">
      {confirmModal === 'update' && (
        <ConfirmModal
          setConfirmModal={setConfirmModal}
          message="Vos informations ont bien été mises à jour."
        />
      )}

      {confirmModal === 'delete' && (
        <ConfirmModal
          setConfirmModal={setConfirmModal}
          UserDeleteHandler={UserDeleteHandler}
          message="Votre compte a bien été supprimé. Merci d'avoir utilisé BlaBla Book !"
        />
      )}

      {displayDeleteUserModal && (
        <DeleteUserModal
          setDisplayDeleteUserModal={setDisplayDeleteUserModal}
          setConfirmModal={setConfirmModal}
        />
      )}

      {libraryId !== undefined && displayDeleteLibraryModal && (
        <DeleteLibraryModal
          getUser={getUser}
          libraryId={libraryId}
          setDisplayDeleteLibraryModal={setDisplayDeleteLibraryModal}
        />
      )}

      <SubHeader
        title={'Mon profil'}
        sections={[
          'Mes informations',
          'Modifier mon mot de passe',
          'Supprimer mon compte',
        ]}
        sectionChoice={userSection}
        setSectionChoice={setUserSection}
      />

      <div className="user-profile-container">
        <div className="user-data-section">
          <p className={`user-update-form-title fade ${fadeClass}`}>
            {displayedSection}
          </p>

          {userSection === 'Mes informations' && (
            <UpdateInfos
              user={user}
              getUser={getUser}
              setConfirmModal={setConfirmModal}
            />
          )}

          {userSection === 'Modifier mon mot de passe' && (
            <UpdatePassword
              getUser={getUser}
              setConfirmModal={setConfirmModal}
            />
          )}

          {userSection === 'Supprimer mon compte' && (
            <DeleteUser setDisplayDeleteUserModal={setDisplayDeleteUserModal} />
          )}
        </div>

        <UserLibraries
          user={user}
          getUser={getUser}
          setLibraryId={setLibraryId}
          setDisplayDeleteLibraryModal={setDisplayDeleteLibraryModal}
        />

        <Reviews user={user} setReviewed={setReviewed} />
      </div>
    </section>
  );
}

export default User;
