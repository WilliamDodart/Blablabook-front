import type { IReviews } from './review';

export type IBooks = {
  id: number;
  isbn: number;
  title: string;
  author: string;
  summary: string;
  image: string;
  pages: number;
  editor: string;
  publication_year: number;
  Genres: IGenre[];
  LibraryBook: ILibraryBook;
  Reviews: IReviews[];
};

export type ILibrary = {
  id: number;
  name: string;
  Books: IBooks[];
};

export type IGenre = {
  name: string;
  id: number;
};

export type ILibraryBook = {
  read: boolean;
  library_id: number;
  book_id: number;
};

export type IReviewError = {
  review: string;
};
