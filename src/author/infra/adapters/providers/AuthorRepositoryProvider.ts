import { IAuthorRepositorySymbol } from '@author/domain/author/ports/repositories/IAuthorRepository';
import { AuthorRepository } from '@author/infra/adapters/repositories';
import type { Provider } from '@nestjs/common';

export const AuthorRepositoryProvider: Provider = {
  provide: IAuthorRepositorySymbol,
  useClass: AuthorRepository,
};
