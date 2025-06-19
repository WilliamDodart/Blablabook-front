import { Link } from 'react-router';
import './MentionLegale.scss';

function MentionLegale() {
  return (
    <>
      <section className="legal-section">
        <h1 className="legal-section-title">Mentions légales</h1>
        <div className="legal-section-container">
          <p>Date de mise à jour : 5 mai 2025</p>

          <h2>1. Éditeur du site</h2>
          <p>
            Le site <strong>BlaBlaBook</strong> est édité par l’association
            fictive BlaBlaBook, régie par la loi du 1er juillet 1901.
            <br />
            <strong>Nom de l’association :</strong> BlaBlaBook
            <br />
            <strong>Siège social :</strong> 123 rue des Livres, 75000 Paris,
            France
            <br />
            <strong>Email :</strong>{' '}
            <a href="mailto:contact@blablabook.fr">contact@blablabook.fr</a>
            <br />
            <strong>Responsables de la publication :</strong> Cédric, Titouan,
            William et Dylan, membres de l’association
          </p>

          <h2>2. Hébergeur</h2>
          <p>
            Le site est hébergé par :<br />
            <strong>BlaBlaBook</strong>
            <br />
            123 rue des Livres, 75000 Paris, France
            <br />
            <strong>Téléphone :</strong> XX XX XX XX XX
            <br />
            <strong>Site web :</strong> <a href="[URL hébergeur]">XXXX</a>
          </p>

          <h2>3. Informations Techniques</h2>
          <p>
            Il est rappelé que le secret des correspondances n’est pas garanti
            sur le réseau Internet et qu’il appartient à chaque utilisateur
            d’Internet de prendre toutes les mesures appropriées de façon à
            protéger ses propres données et/ou logiciels de la contamination
            d’éventuels virus circulant sur Internet.
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L’ensemble du contenu présent sur le site (textes, images, logos,
            graphismes, icônes, etc.) est la propriété exclusive de{' '}
            <strong>BlaBlaBook</strong>, sauf mention contraire. Toute
            reproduction, distribution, modification, adaptation, retransmission
            ou publication, même partielle, est strictement interdite sans
            accord écrit préalable.
          </p>

          <h2>5. Données personnelles</h2>
          <p>
            Pour en savoir plus sur le traitement de vos données, veuillez
            consulter notre{' '}
            <Link to="/confidentality">Politique de Confidentialité</Link>.
          </p>

          <h2>6. Responsabilité</h2>
          <p>
            BlaBlaBook met tout en œuvre pour assurer l’exactitude des
            informations publiées. Toutefois, des erreurs ou omissions peuvent
            apparaître. L’utilisateur est seul responsable de l’usage qu’il fait
            du contenu du site.
          </p>

          <h2>7. Droit applicable</h2>
          <p>
            Le présent site est soumis au droit français. En cas de litige, les
            tribunaux compétents seront ceux du ressort de Paris, sauf
            disposition contraire.
          </p>

          <h2>8. Droit d'auteur</h2>
          <p>
            La reproduction ou représentation, intégrale ou partielle, des
            pages, des données et de tout autre élément constitutif du site, par
            quelque procédé ou support que ce soit, est interdite et constitue
            sans autorisation de l’éditeur une contrefaçon.
          </p>
        </div>
      </section>
    </>
  );
}

export default MentionLegale;
