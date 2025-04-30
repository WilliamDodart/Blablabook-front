import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router';
import '../Books/Books.scss'
import './PersonalLibrary.scss'
 import axios from 'axios';


function Books() {

    const userId = 1;


    const [myLibraries, setMyLibraries] = useState([]);
    useEffect(() => {
        const getmyLibraries = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/user/${userId}/libraries/books`,
                );
                setMyLibraries(response.data);
                // console.log(response.data);
                // console.log(response.data[0]);
                // console.log(response.data[0].Books);

            } catch (error) {
                console.log(error);
                
            }
        };
        getmyLibraries();
    }, []);
    // Ajouter manuellement une bibliothèque pour le user 1
    // INSERT INTO "library" ("name", "user_id") VALUES ('nom bibliothèque', 1);
 


    async function handleLibraryCreation(formData) {
        const formDataValue = formData.get('newLibraryName') as string;
        try {
            console.log(formDataValue);

            // Requête POST axios avec :
            // library_id: libraryId,
            // book_id: bookId,
            
        } catch (error) {
            console.log(error);
            
        }
    }



    return (
        <section id="books-section" className="section">
            <div className='head-books'>
                <h1>Ma bibliothèque</h1>
                <input type="text"
                placeholder="Recherche parmis vos livres" />
            </div> 

            <div id="library-choice">
                <ul>
                    <NavLink to=""><li>Tous</li></NavLink>
                    <NavLink to=""><li>Lus</li></NavLink>
                    <NavLink to=""><li>A lire</li></NavLink>
                </ul>
                <form action={handleLibraryCreation} >
                    <input type="text" id="newLibraryName" name="newLibraryName" placeholder='Créer une bibliothèque' />
                    <button type="submit">Créer</button>
                </form>
            </div>


            {myLibraries.map((library) => {
                return(

                    <div className="books-list" key={library.id}>

                        <h3 className='library-title'>{library.name}</h3>
                        <ul >
                            {library.Books.map((book) => {
                                return (
                                    <li key={book.id}>
                                        <Link to={`/book/${book.id}`}>
                                            <figure>
                                                <div id="book-img">
                                                    <img
                                                        src={book.image} alt="book-image"
                                                    />
                                                    <button type='button'> ... </button>
                                                </div>
                                                <hgroup>
                                                    <figcaption>{book.title}</figcaption>
                                                    <h5>{book.author}</h5>
                                                </hgroup>

                                            </figure>
                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </div> 
                )
            })}
        </section>
    )
}

export default Books;