import type { IBooks } from './books';
import type { ILibraries } from './libraries';

export type IUser = {
  id: number;
  name: string;
  firstname: string;
  email: string;
  password: string;
  Libraries: ILibraries[];
  createdAt: string;
  updatedAt: string;
  admin: boolean;
  Reviews: IReviews[];
};

export type IUserError = {
  email: string;
  password: string;
};

export type IRegisterError = {
  firstname: string;
  name: string;
  email: string;
  password: string;
};

export type IUserUpdateError = {
  password: string;
  confirmPassword: string;
};
