import { IBookRepositorySymbol } from '@book/domain/book/ports/repositories/IBookRepository';
import { BookRepository } from '@book/infra/adapters/repositories';
import type { Provider } from '@nestjs/common';

export const BookRepositoryProvider: Provider = {
  provide: IBookRepositorySymbol,
  useClass: BookRepository,
};
