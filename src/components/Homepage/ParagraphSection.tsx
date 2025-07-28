function ParagraphSection() {
  return (
    <section className="paragraphs-section section">
      <div className="left-paragraph">
        <h3>Un espace dédié à chaque ouvrage</h3>
        <p>
          Chaque fiche livre vous donne un aperçu complet des informations
          essentielles : titre, auteur, résumé, genre. Vous pourrez ainsi en
          savoir plus sur un ouvrage avant de l’ajouter à votre bibliothèque.
          Vous pourrez choisir si ce livre fait partie de vos lectures passées,
          en cours ou à venir
        </p>
      </div>

      <div className="center-paragraph">
        <div className="center-paragraph-divider" />
      </div>

      <div className="right-paragraph">
        <h3>Exprimez-vous en tant que lecteur</h3>
        <p>
          BlaBla Book ne se limite pas à la gestion : c’est aussi une plateforme
          de partage. Vous avez adoré un livre ? Laissez un avis et une note.
          Vous avez été déçu ? Partagez-le aussi. Vos retours enrichissent la
          communauté et aident d’autres utilisateurs à faire leur choix !
        </p>
      </div>
    </section>
  );
}

export default ParagraphSection;
