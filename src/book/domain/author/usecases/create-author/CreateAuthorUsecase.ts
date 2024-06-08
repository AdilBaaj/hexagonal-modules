import type { CreateAuthorCommand } from './CreateAuthorCommand';

import { AuthorAlreadyExistsException } from '@book/domain/author/exceptions';
import {
  type IAuthorRepository,
  IAuthorRepositorySymbol,
} from '@book/domain/author/ports/repositories/IAuthorRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateAuthorUsecase {
  public constructor(
    @Inject(IAuthorRepositorySymbol)
    private readonly authorRepository: IAuthorRepository,
  ) {}

  public async handle(author: CreateAuthorCommand): Promise<void> {
    const authorExists = await this.authorRepository.existsById(author.id);
    if (authorExists) {
      throw new AuthorAlreadyExistsException(
        `Author with id ${author.id} already exists`,
      );
    }
    await this.authorRepository.createAuthor(author);
  }
}
