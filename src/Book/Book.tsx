import './Book.scss';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios'
import type { IBooks } from '../@types/books';


function Book() {

  const params = useParams();
  const bookId = params.id;
  // console.log(bookId);

  const [book, setBook] = useState<IBooks | null>(null);

    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/book/${bookId}`,
                );
                setBook(response.data);
            } catch (error) {
              console.log(error)
            }
        };
        getBook();
    }, [bookId]);

    
    // console.log(book);
    

  return (
    <section id="book-section" className="section"> 
        <Link to="/books"><img id="left-arrow" src="../Pictures/humbleicons--arrow-left.png" alt="left-arrow" /></Link>
        {book ? (
          <>
          <h2>{book.title}</h2>
        <div id="presentation">
          <div id="presentation-image">
            <img src={`${book.image}`} alt={`${book.title}`}/>
          </div>
            <div id="presentation-texts">
              <div id="details">
                  {/* <h2>{book.title}</h2> */}
                  <p>De: {book.author}</p>
                  <p>Parution: {book.publication_year}</p>
                  <p>Édition: {book.editor}</p>
                  <p>ISBN: {book.isbn}</p>
                  <p>{book.pages} pages</p>
              </div>
            </div>
            
          </div>
          <div id="summary">
            <hr />
            <h3>Résumé:</h3>  
            <p>{book.summary}</p>
            <Link to=""><img id="add-button" src="../Pictures/ic--outline-plus.png" alt="left-arrow" /></Link>

          </div>
          </>
        ): <p>Chargement.... </p>}
        
        
    </section>
  )
}

export default Book







