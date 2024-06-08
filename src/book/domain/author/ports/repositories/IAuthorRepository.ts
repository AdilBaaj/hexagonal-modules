import type { Author } from '@book/domain/author/entities/Author';

export interface IAuthorRepository {
  createAuthor: (author: Author) => Promise<Author>;
  updateAuthor: (author: Author) => Promise<Author>;
  deleteAuthor: (authorId: number) => Promise<void>;
  existsById: (authorId: number) => Promise<boolean>;
}

export const IAuthorRepositorySymbol = Symbol('IAuthorRepository');
