import './Confidentalite.scss';
import ScrollTop from '../../utils/ScrollTop';

function Confidentalite() {
  return (
    <>
      <ScrollTop />
      <section className="privacy-section">
        <h1 className="privacy-section-title">Politique de Confidentialité</h1>
        <div className="privacy-section-container">
          <p>Date de dernière mise à jour : 5 mai 2025</p>

          <h2>1. Introduction</h2>
          <p>
            Chez <strong>BlaBlaBook</strong>, nous respectons votre vie privée.
            Cette politique explique comment nous collectons, utilisons et
            protégeons vos données personnelles lorsque vous utilisez notre
            plateforme.
          </p>

          <h2>2. Données que nous collectons</h2>
          <ul>
            <li>Nom, prénom, adresse e-mail, mot de passe chiffré</li>
            <li>
              Informations sur vos livres : lectures passées, en cours ou à
              venir
            </li>
            <li>Commentaires, notes, avis que vous publiez</li>
            <li>Données de navigation sur le site (cookies, adresse IP)</li>
          </ul>

          <h2>3. Utilisation de vos données</h2>
          <p>Nous utilisons vos données pour :</p>
          <ul>
            <li>
              Fournir l’accès à nos services (création de bibliothèque
              personnelle, partage d’avis, etc.)
            </li>
            <li>Améliorer notre plateforme et l’expérience utilisateur</li>
            <li>
              Envoyer des communications (notifications, newsletters si vous
              avez consenti)
            </li>
          </ul>

          <h2>4. Partage de vos données</h2>
          <p>
            Vos données ne sont jamais vendues. Elles peuvent être partagées
            avec des prestataires techniques (hébergement, analyse) uniquement
            dans le cadre de l’exécution du service.
          </p>

          <h2>5. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>
              Droit d’accès, de rectification ou de suppression de vos données
            </li>
            <li>Droit de limiter ou de vous opposer à leur traitement</li>
            <li>Droit à la portabilité de vos données</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à :{' '}
            <a href="mailto:contact@blablabook.fr">contact@blablabook.fr</a>
          </p>

          <h2>6. Cookies</h2>
          <p>
            <strong>BlaBlaBook</strong> utilise des cookies pour améliorer votre
            navigation et recueillir des statistiques anonymes. Vous pouvez
            gérer vos préférences dans les paramètres de votre navigateur.
          </p>

          <h2>7. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles
            appropriées pour protéger vos données contre tout accès non
            autorisé, perte ou altération.
          </p>

          <h2>8. Modifications</h2>
          <p>
            Cette politique peut être mise à jour. En cas de modification
            importante, vous en serez informé via notre site ou par email.
          </p>

          <h2>9. Contact</h2>
          <p>
            Pour toute question, vous pouvez nous contacter à :{' '}
            <a href="mailto:contact@blablabook.fr">contact@blablabook.fr</a>
          </p>
        </div>
      </section>
    </>
  );
}

export default Confidentalite;
