import { Link } from 'react-router';
import type { IBooks } from '../../@types/books';
import './SearchBar.scss';

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
    <div className="search-bar">
      <input
        type="text"
        className="search-bar-input"
        name="search"
        placeholder="Recherche par titre, auteur, ISBN ..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {searchTerm.length > 0 && searchResults.length > 0 && (
        <ul className="search-bar-list">
          {searchResults.map((book) => (
            <li className="search-bar-list-result" key={book.id}>
              <Link
                to={`/book/${book.id}`}
                className="search-bar-list-result-link"
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
