export type IAddBookError = {
  title: string;
  image: string;
  author: string;
  publication_year: string;
  editor: string;
  isbn: string;
  pages: string;
  summary: string;
};

export type IDeleteBookError = {
  password: string;
};
