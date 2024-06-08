import type { Author } from '@author/domain/author/entities/Author';
import type {
  NewAuthor,
  UpdateAuthor,
} from '@author/domain/author/value-objects';
import type {
  PaginatedValue,
  PaginationQueryValue,
} from '@shared/domain/value-objects';
import type { Optional } from '@shared/types';

export interface IAuthorRepository {
  findAllAuthors: (
    paginationQuery: PaginationQueryValue,
  ) => Promise<PaginatedValue<Author>>;
  findAuthorById: (id: number) => Promise<Optional<Author>>;
  createAuthor: (author: NewAuthor) => Promise<Author>;
  updateAuthor: (id: number, author: UpdateAuthor) => Promise<Author>;
  deleteAuthor: (id: number) => Promise<void>;
  existsById: (id: number) => Promise<boolean>;
  existsByEmail: (email: string) => Promise<boolean>;
}

export const IAuthorRepositorySymbol = Symbol('IAuthorRepository');
