import { useEffect, useState } from 'react';
import type { IBooks } from '../../@types/books';
import './Homepage.scss';
import { Link } from 'react-router';
import type { IUser } from '../../@types/user';
import api from '../../utils/axiosApi';

interface HomepageProps {
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | undefined;
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
        console.log(error);
      }
    };
    getRandomBooks();
  }, []);

  const clickButtonHomePage = () => {
    setDisplayRegisterForm(true);
  };

  return (
    <div className="homepage">
      <section className="hero-section section">
        <div className="hero-section-presentation">
          <hgroup>
            <h4 className="hero-section-presentation-subtitle">
              PARTAGEZ VOTRE PASSION AVEC
            </h4>
            <h1 className="hero-section-presentation-title">Blabla Book</h1>
          </hgroup>
          {isLogged && user?.firstname ? (
            <p>
              Bienvenue <strong>{user.firstname}</strong> dans l'univers des
              livres ! Chaque page tournée est une nouvelle aventure. Découvrez,
              partagez, et vivez votre passion avec toute la communauté BlaBla
              Book.
            </p>
          ) : (
            <p>
              Bienvenue dans l'univers des livres où chaque page tournée est une
              nouvelle aventure. Rejoignez notre communauté de lecteurs
              passionnés, partagez vos coups de cœur et découvrez des trésors
              littéraires qui vous attendent. Ne restez pas seul avec vos livres
              !
            </p>
          )}

          {isLogged ? (
            <Link
              to="/books"
              className="hero-section-presentation-button link-correction"
            >
              Accéder à nos livres
            </Link>
          ) : (
            <button
              type="button"
              className="hero-section-presentation-button"
              onClick={clickButtonHomePage}
            >
              Commencer ici
            </button>
          )}
        </div>
        <div className="hero-section-img">
          <img src="../Pictures/pres.jpeg" alt="" />
        </div>
      </section>

      <section className="personal-section section">
        <div className="personal-section-container">
          <hgroup className="personal-section-container-title">
            <h4>PRENEZ PLAISIR À CRÉER</h4>
            <h2>Vos bibliothèques personnelles</h2>
          </hgroup>
          <p>
            Chaque utilisateur peut créer ses propres bibliothèques, ajouter les
            livres déjà lus ou ceux qu’il souhaite lire, et garder une trace de
            ses découvertes. Vous pouvez consulter les informations de chaque
            ouvrage, ajouter des commentaires ou des notes, et ainsi construire
            une mémoire vivante de votre parcours de lecteur.
          </p>
          <p>
            Vous avez oublié si vous avez déjà lu ce roman il y a deux ans ?
            Avec BlaBlaBook, ce genre d’incertitude n’existe plus. Tout est
            centralisé, organisé et accessible depuis votre espace personnel.
          </p>

          <hr className="personal-section-container-separator" />
        </div>
      </section>

      <section className="inspiration-section section">
        <div>
          <hgroup className="inspiration-section-title">
            <h3>Besoin d’inspiration ?</h3>
            <p>Laissez-vous surprendre par notre sélection du jour.</p>
          </hgroup>
          <div>
            <ul className="inspiration-section-list">
              {randomBooks.map((randombook) => {
                return (
                  <li key={randombook.id}>
                    <Link
                      to={isLogged ? `/book/${randombook.id}` : '#'}
                      onClick={(e) => {
                        if (!isLogged) {
                          e.preventDefault();
                          setDisplayLoginForm(true);
                        }
                      }}
                    >
                      <figure>
                        <div className="inspiration-section-list-img">
                          <img src={randombook.image} alt="book-image" />
                          <button
                            type="button"
                            className="add-btn"
                            aria-label="Ajouter à une bibliothèque"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (isLogged) {
                                setCurrentBook(randombook);
                                setDisplayModalBook(true);
                              } else {
                                setDisplayLoginForm(true);
                              }
                            }}
                          >
                            +
                          </button>
                        </div>
                        <hgroup>
                          <figcaption>{randombook.title}</figcaption>
                          <h5>{randombook.author}</h5>
                        </hgroup>
                      </figure>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="paragraphs-section section">
        <div className="left-paragraph">
          <h3>Un espace dédié à chaque ouvrage</h3>
          <p>
            Chaque fiche livre vous donne un aperçu complet des informations
            essentielles : titre, auteur, résumé, genre. Vous pourrez ainsi en
            savoir plus sur un ouvrage avant de l’ajouter à votre bibliothèque.
            Vous pourrez choisir si ce livre fait partie de vos lectures
            passées, en cours ou à venir
          </p>
        </div>

        <div className="center-paragraph">
          <div className="center-paragraph-divider" />
        </div>

        <div className="right-paragraph">
          <h3>Exprimez-vous en tant que lecteur</h3>
          <p>
            BlaBla Book ne se limite pas à la gestion : c’est aussi une
            plateforme de partage. Vous avez adoré un livre ? Laissez un avis et
            une note. Vous avez été déçu ? Partagez-le aussi. Vos retours
            enrichissent la communauté et aident d’autres utilisateurs à faire
            leur choix !
          </p>
        </div>
      </section>

      <section className="info-section section">
        <div className="info-section-img">
          <img src="../Pictures/img-livres.jpg" alt="" />
        </div>
        <div className="info-section-text">
          <h2>Une bibliothèque à votre image</h2>
          <p>
            Vous retrouvez tous les livres que vous avez ajoutés à votre profil.
            Qu’ils soient lus ou encore à lire, ils sont organisés de façon
            claire, et vous pouvez les trier selon vos préférences : par statut,
            par genre, ou encore par date d’ajout.
          </p>
          <p>
            Vous pouvez aussi renommer vos bibliothèques, en créer plusieurs et
            les gérer à votre convenance. Cet outil est conçu pour s’adapter à
            vos habitudes de lecture et vous permettre de garder une trace de
            toutes vos envies littéraires.
          </p>
        </div>
      </section>

      <section className="call-to-action-section">
        {isLogged && user?.firstname ? (
          <h2>Bienvenue chez BlaBla Book, {user.firstname} !</h2>
        ) : (
          <h2>Rejoignez notre communauté littéraire</h2>
        )}

        {isLogged ? (
          <Link to="/myLibrary" className="call-to-action-section-button">
            Accéder à ma bibliothèque
          </Link>
        ) : (
          <button
            type="button"
            onClick={clickButtonHomePage}
            className="call-to-action-section-button"
          >
            Commencer ici
          </button>
        )}
      </section>
    </div>
  );
}

export default Homepage;
