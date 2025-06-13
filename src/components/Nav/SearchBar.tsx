import { Link } from 'react-router';
import type { IBooks } from '../../@types/books';

interface ISearchBarProps {
  searchResults: IBooks[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<React.SetStateAction<IBooks[]>>;
}

function SearchBar({
  searchTerm,
  setSearchTerm,
  searchResults,
  setSearchResults,
}: ISearchBarProps) {
  return (
    <div className="search-container">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Recherche par titre, auteur, ISBN ..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {searchTerm.length > 0 && searchResults.length > 0 && (
        <ul className="search-result">
          {searchResults.map((book) => (
            <li key={book.id}>
              <Link
                to={`/book/${book.id}`}
                className="book-result"
                onClick={() => {
                  setSearchTerm('');
                  setSearchResults([]);
                }}
              >
                {book.title} — {book.author}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
