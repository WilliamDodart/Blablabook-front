import type { IBooks } from './books';

export type ILibraries = {
  id: number;
  name: string;
  Books: IBooks[];
  createdAt: string;
  updatedAt: string;
};

export type FilterState = {
  libraryId: string;
  genre: string;
  //status: string;
};
