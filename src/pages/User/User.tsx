import axios from 'axios';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { IUser, IUserUpdateError } from '../../@types/user';
import api from '../../utils/axiosApi';
import './User.scss';
import Loader from '../../components/Loader/Loader';
import ConfirmDeleteUserModal from '../../components/Modals/Confirm/ConfirmDeleteUserModal';
import UpdateUserModal from '../../components/Modals/Confirm/ConfirmUpdateUserModal';
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
  const [errors, setErrors] = useState<IUserUpdateError>(
    {} as IUserUpdateError,
  );
  const [displayUpdateUserModal, setDisplayUpdateUserModal] = useState(false);
  const [displayDeleteUserModal, setDisplayDeleteUserModal] = useState(false);
  const [displayConfirmDeleteUserModal, setDisplayConfirmDeleteUserModal] =
    useState(false);
  const [displayDeleteLibraryModal, setDisplayDeleteLibraryModal] =
    useState(false);
  const [libraryId, setLibraryId] = useState<number>();
  const [userSection, setUserSection] = useState<string>('Mes informations');

  //For fading title animation
  const [displayedSection, setDisplayedSection] = useState('');
  const [fadeClass, setFadeClass] = useState('');

  //For loading page animation
  const [isLoading, setIsLoading] = useState(true);

  const getUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/user');
      setUser(response.data);
      setIsLoading(false);
    } catch (_error) {}
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

  function closeUpdateUserModal() {
    setDisplayUpdateUserModal(false);
  }

  function closeDeleteUserModal() {
    setDisplayDeleteUserModal(false);
  }

  function closeDeleteLibraryModal() {
    setDisplayDeleteLibraryModal(false);
  }

  //Close the confirmation of user data deletion, disconnect the user and redirect him to the homepage
  function closeConfirmDeleteUserModal() {
    localStorage.removeItem('token');
    setIsLogged(false);
    setUser(undefined);
    setDisplayConfirmDeleteUserModal(false);
    navigate('/');
  }

  async function handleUserDatasUpdate(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setErrors({} as IUserUpdateError);
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await api.patch('/user', {
        name: formData.get('name'),
        firstname: formData.get('firstname'),
        email: formData.get('email'),
        currentPassword: formData.get('current-password'),
        newPassword: formData.get('new-password'),
        confirmPassword: formData.get('confirm-password'),
      });

      form.reset();
      getUser();
      setDisplayUpdateUserModal(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IUserUpdateError = {
          confirmPassword: '',
          password: '',
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IUserUpdateError] = error.error;
        }
        setErrors(formattedErrors);
      }
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="user-profile">
      {displayUpdateUserModal && (
        <UpdateUserModal
          closeUpdateUserModal={closeUpdateUserModal}
          setDisplayUpdateUserModal={setDisplayUpdateUserModal}
        />
      )}
      {displayDeleteUserModal && (
        <DeleteUserModal
          closeDeleteUserModal={closeDeleteUserModal}
          setDisplayDeleteUserModal={setDisplayDeleteUserModal}
          setDisplayConfirmDeleteUserModal={setDisplayConfirmDeleteUserModal}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {displayConfirmDeleteUserModal && (
        <ConfirmDeleteUserModal
          closeConfirmDeleteUserModal={closeConfirmDeleteUserModal}
        />
      )}
      {libraryId !== undefined && displayDeleteLibraryModal && (
        <DeleteLibraryModal
          closeDeleteLibraryModal={closeDeleteLibraryModal}
          errors={errors}
          setErrors={setErrors}
          libraryId={libraryId}
          setUser={setUser}
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
              errors={errors}
              handleUserDatasUpdate={handleUserDatasUpdate}
            />
          )}

          {userSection === 'Modifier mon mot de passe' && (
            <UpdatePassword
              handleUserDatasUpdate={handleUserDatasUpdate}
              errors={errors}
            />
          )}

          {userSection === 'Supprimer mon compte' && (
            <DeleteUser
              setErrors={setErrors}
              setDisplayDeleteUserModal={setDisplayDeleteUserModal}
            />
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
