import { Link } from 'react-router';
import type { IBooks } from '../../@types/books';

interface IInspirationSectionProps {
  randomBooks: IBooks[];
  isLogged: boolean;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
}

function InspirationSection({
  randomBooks,
  isLogged,
  setDisplayLoginForm,
  setCurrentBook,
  setDisplayModalBook,
}: IInspirationSectionProps) {
  return (
    <section className="inspiration-section section">
      <div>
        <hgroup className="inspiration-section-title">
          <h3>Besoin d’inspiration ?</h3>
          <p>Laissez-vous surprendre par notre sélection du jour.</p>
        </hgroup>
        <div>
          <ul className="inspiration-section-list">
            {randomBooks.map((randombook) => {
              return (
                <li key={randombook.id}>
                  <Link
                    to={isLogged ? `/book/${randombook.id}` : '#'}
                    onClick={(e) => {
                      if (!isLogged) {
                        e.preventDefault();
                        setDisplayLoginForm(true);
                      }
                    }}
                  >
                    <figure>
                      <div className="inspiration-section-list-img">
                        <img src={randombook.image} alt="book-image" />
                        <button
                          type="button"
                          className="add-btn"
                          aria-label="Ajouter à une bibliothèque"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (isLogged) {
                              setCurrentBook(randombook);
                              setDisplayModalBook(true);
                            } else {
                              setDisplayLoginForm(true);
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                      <hgroup>
                        <figcaption>{randombook.title}</figcaption>
                        <h5>{randombook.author}</h5>
                      </hgroup>
                    </figure>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default InspirationSection;
