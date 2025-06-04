import type { IGenre } from '../../@types/books';

interface IGenreFieldProps {
  name: string;
  label: string;
  option: string;
  allGenres: IGenre[];
  primary?: boolean;
}

function GenreField({
  name,
  label,
  option,
  allGenres,
  primary = true,
}: IGenreFieldProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name}>
        <option value="">{option}</option>
        {!primary && <option value="">Aucun</option>}
        {allGenres.map((genre: IGenre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default GenreField;
