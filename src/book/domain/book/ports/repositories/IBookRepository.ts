import type { Book } from '@book/domain/book/entities/Book';
import type { NewBook, UpdateBook } from '@book/domain/book/value-objects';
import type {
  PaginatedValue,
  PaginationQueryValue,
} from '@shared/domain/value-objects';
import type { Optional } from '@shared/types';

export interface IBookRepository {
  findAllBooks: (
    paginationQuery: PaginationQueryValue,
  ) => Promise<PaginatedValue<Book>>;
  findBookById: (bookId: number) => Promise<Optional<Book>>;
  createBook: (book: NewBook) => Promise<Book>;
  updateBook: (bookId: number, book: UpdateBook) => Promise<Book>;
  deleteBook: (bookId: number) => Promise<void>;
  findBooksByAuthorId: (authorId: number) => Promise<Book[]>;
  existsById: (bookId: number) => Promise<boolean>;
}

export const IBookRepositorySymbol = Symbol('IBookRepository');
