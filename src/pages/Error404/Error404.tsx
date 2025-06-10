import './Error404.scss';

function Error() {
  return (
    <section className="error-page">
      <div className="error-page-content">
        <h1>404</h1>
        <h2>Oups ! Page introuvable</h2>
        <p>La page que vous cherchez n’existe pas.</p>
        <a href="/" className="error-page-content-button">
          Retour à l’accueil
        </a>
      </div>
    </section>
  );
}

export default Error;
