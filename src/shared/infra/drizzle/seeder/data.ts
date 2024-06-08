import type { NewAuthor } from '@author/domain/author/value-objects';
import type { NewBook } from '@book/domain/book/value-objects';

export const AUTHORS_DATA: NewAuthor[] = [
  {
    name: 'J.K. Rowling',
    birthDate: new Date('1965-07-31'),
    email: 'rowling@mail.com',
  },
  {
    name: 'George R. R. Martin',
    birthDate: new Date('1948-09-20'),
    email: 'martin@mail.com',
  },
];

export const BOOKS_DATA: Array<Omit<NewBook, 'authorId'>> = Array.from(
  { length: 50 },
  (_, index) => ({
    content: `Book ${index + 1}`,
    title: `Title ${index + 1}`,
  }),
);
