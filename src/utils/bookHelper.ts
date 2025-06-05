import type { IBooks } from '../@types/books';

export function filterBooks(books: IBooks[], input: string) {
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(input.toLowerCase()) ||
      book.author.toLowerCase().includes(input.toLowerCase()),
  );
}
