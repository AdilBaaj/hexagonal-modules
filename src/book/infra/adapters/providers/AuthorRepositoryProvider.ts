import { IAuthorRepositorySymbol } from '@book/domain/author/ports/repositories/IAuthorRepository';
import { AuthorRepository } from '@book/infra/adapters/repositories';
import type { Provider } from '@nestjs/common';

export const AuthorRepositoryProvider: Provider = {
  provide: IAuthorRepositorySymbol,
  useClass: AuthorRepository,
};
