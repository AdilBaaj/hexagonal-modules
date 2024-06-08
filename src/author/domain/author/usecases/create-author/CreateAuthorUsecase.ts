import type { CreateAuthorCommand } from './CreateAuthorCommand';

import type { Author } from '@author/domain/author/entities/Author';
import { AuthorAlreadyExistsException } from '@author/domain/author/exceptions';
import {
  type IAuthorRepository,
  IAuthorRepositorySymbol,
} from '@author/domain/author/ports/repositories/IAuthorRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateAuthorUsecase {
  public constructor(
    @Inject(IAuthorRepositorySymbol)
    private readonly authorRepository: IAuthorRepository,
  ) {}

  public async handle(author: CreateAuthorCommand): Promise<Author> {
    const authorExists = await this.authorRepository.existsByEmail(
      author.email,
    );
    if (authorExists) {
      throw new AuthorAlreadyExistsException(
        `Author with email ${author.email} already exists`,
      );
    }
    return await this.authorRepository.createAuthor(author);
  }
}
