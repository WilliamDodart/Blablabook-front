function PersonalSection() {
  return (
    <section className="personal-section">
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
          Vous avez oublié si vous avez déjà lu ce roman il y a deux ans ? Avec
          BlaBlaBook, ce genre d’incertitude n’existe plus. Tout est centralisé,
          organisé et accessible depuis votre espace personnel.
        </p>

        <hr className="personal-section-container-separator" />
      </div>
    </section>
  );
}

export default PersonalSection;
