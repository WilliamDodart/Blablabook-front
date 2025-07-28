function InfoSection() {
  return (
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
          les gérer à votre convenance. Cet outil est conçu pour s’adapter à vos
          habitudes de lecture et vous permettre de garder une trace de toutes
          vos envies littéraires.
        </p>
      </div>
    </section>
  );
}

export default InfoSection;
