import type { IBooks, IGenre, ILibrary } from '../@types/books';

function extractUniqueGenres(libraries: ILibrary[]) {
  const allGenres = libraries.flatMap((library) =>
    library.Books.flatMap((book: IBooks) =>
      book.Genres.map((genre: IGenre) => genre.name),
    ),
  );

  return [...new Set(allGenres)].sort();
}

export default extractUniqueGenres;
