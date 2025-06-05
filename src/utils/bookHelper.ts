import type { IBooks } from '../@types/books';

export function filterBooks(books: IBooks[], term: string) {
  books.filter(
    (book) =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase()),
  );
}
