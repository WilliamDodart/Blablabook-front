import { Link } from 'react-router';
import type { IUser } from '../../@types/user';

interface HeroSectionProps {
  isLogged: boolean;
  user: IUser | undefined;
  clickButtonHomePage(): void;
}

function HeroSection({
  isLogged,
  user,
  clickButtonHomePage,
}: HeroSectionProps) {
  return (
    <section className="hero-section">
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
            littéraires qui vous attendent. Ne restez pas seul avec vos livres !
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
  );
}

export default HeroSection;
