import { Link } from 'react-router';
import '../Footer/Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <Link className="footer-top-link" to="legal-notice">Mentions Légales</Link>
        <Link className="footer-top-link" to="/confidentality"> Confidentialité </Link>
        <Link className="footer-top-link" to="/contact">Contact</Link>
      </div>

      <div className="footer-bottom">
        <p className="footer-bottom-paragraph" >©2025 Blabla Book - Tous droits réservés</p>
      </div>
    </div>
  );
}

export default Footer;
