import { useEffect, useState } from 'react';
import type { IBooks } from '../@types/books';
import './Homepage.scss';
import axios from 'axios'
import { Link } from 'react-router';

interface HomepageProps {
    setDisplayRegisterForm:  React.Dispatch<React.SetStateAction<boolean>>;
  }

function Homepage({setDisplayRegisterForm}:HomepageProps) {

    const [randomBooks, setRandomBooks] = useState<IBooks[]>([]);

    useEffect(() => {
        const getRandomBooks = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/random-books",
                );
                setRandomBooks(response.data);
            } catch (_error) {
            }
        };
        getRandomBooks();
    }, []);

    const clickButtonHomePage = () => {
        setDisplayRegisterForm(true); 
    };


    return (
        <div id="homepage">
            <section id="hero-section" className="section">
                <div id="presentation">
                    <hgroup>
                        <h4>Partagez votre passion avec</h4>
                        <h1>Blabla Book</h1>
                    </hgroup>
                    <p>Bienvenue dans l'univers des livres où chaque page tournée est une nouvelle aventure. Rejoignez notre communauté de lecteurs passionnés, partagez vos coups de cœur et découvrez des trésors littéraires qui vous attendent. Ne restez pas seul avec vos livres !</p>

                    <button type="button" className="button" onClick={clickButtonHomePage}>Commencer ici</button>
                </div>
                <div id="presentation-img">
                    <img src="../Pictures/pres.jpeg" alt="" />
                </div>
            </section>


            <section id="personal-library-section" className="section">
                <div className='personal-library-container'>
                    <hgroup>
                        <h4>LOREM IPSUM DOLOR SIT</h4>
                        <h2>Votre bibliothèque personnelle</h2>
                    </hgroup>
                    <p>Chaque utilisateur peut créer sa propre bibliothèque, ajouter les livres déjà lus ou ceux qu’il souhaite lire, et garder une trace de ses découvertes. Vous pouvez consulter les informations de chaque ouvrage, ajouter des commentaires ou des notes, et ainsi construire une mémoire vivante de votre parcours de lecteur.</p>
                    <p>Vous avez oublié si vous avez déjà lu ce roman il y a deux ans ? Avec BlaBlaBook, ce genre d’incertitude n’existe plus. Tout est centralisé, organisé et accessible depuis votre espace personnel.</p>

                    <hr />
                </div>
            </section>

            <section id="books-section" className="section">
                <div >
                    <hgroup className='books-title'>
                        <h3>Besoin d’inspiration ?</h3>
                        <p>Laisse-toi surprendre par notre sélection du jour.</p>
                    </hgroup>
                    <div>
                        <ul id="books-list">
                            {randomBooks.map((randombook) => {
                                return (
                                    <li key={randombook.id}>
                                        <Link to={`/book/${randombook.id}`}>
                                            <figure>
                                                <div id="book-img">
                                                    <img
                                                        src={randombook.image} alt="book-image"
                                                    />
                                                    <button type='button'> + </button>
                                                </div>
                                                <hgroup>
                                                    <figcaption>{randombook.title}</figcaption>
                                                    <h5>{randombook.author}</h5>
                                                </hgroup>

                                            </figure>
                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </div>
            </section>

            <section id="paragraphs-section" className="section">
                <div>
                    <h3>Un espace dédié à chaque ouvrage</h3>
                    <p>Chaque fiche livre vous donne un aperçu complet des informations essentielles : titre, auteur, résumé, genre. Vous pourrez ainsi en savoir plus sur un ouvrage avant de l’ajouter à votre bibliothèque.
                        Vous pourrez choisir si ce livre fait partie de vos lectures passées, en cours ou à venir</p>
                </div>
                <div>
                    <h3>Exprimez-vous en tant que lecteur</h3>
                    <p>BlaBla Book ne se limite pas à la gestion : c’est aussi une plateforme de partage. Vous avez adoré un livre ? Laissez un avis et une note.
                        Vous avez été déçu ? Partagez-le aussi.
                        Vos retours enrichissent la communauté et aident d’autres utilisateurs à faire leur choix !</p>
                </div>
            </section>

            <section id="section5" className="section">
                <img src="" alt="" />
                <div>
                    <h2>Une bibliothèque à votre image</h2>
                    <p>Vous retrouvez tous les livres que vous avez ajoutés à votre profil. Qu’ils soient lus ou encore à lire, ils sont organisés de façon claire, et vous pouvez les trier selon vos préférences : par statut, par genre, ou encore par date d’ajout.</p>
                    <p>Vous pouvez aussi renommer vos bibliothèques, en créer plusieurs et les gérer à votre convenance. Cet outil est conçu pour s’adapter à vos habitudes de lecture et vous permettre de garder une trace de toutes vos envies littéraires.</p>
                </div>
            </section>

            <section id="call-to-action-section" className="">
                <h2>Rejoinez notre communauté littéraire</h2>
                <button type="button" onClick={clickButtonHomePage}>Commencer ici</button>
            </section>

        </div>
    )
}

export default Homepage;







