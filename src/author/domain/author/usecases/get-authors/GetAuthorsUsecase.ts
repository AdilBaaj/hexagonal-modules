import type { Author } from '@author/domain/author/entities/Author';
import {
  type IAuthorRepository,
  IAuthorRepositorySymbol,
} from '@author/domain/author/ports/repositories/IAuthorRepository';
import { Inject, Injectable } from '@nestjs/common';
import type {
  PaginatedValue,
  PaginationQueryValue,
} from '@shared/domain/value-objects';

@Injectable()
export class GetAuthorsUsecase {
  public constructor(
    @Inject(IAuthorRepositorySymbol)
    private readonly authorRepository: IAuthorRepository,
  ) {}

  public async handle(
    paginationQuery: PaginationQueryValue,
  ): Promise<PaginatedValue<Author>> {
    return await this.authorRepository.findAllAuthors(paginationQuery);
  }
}
