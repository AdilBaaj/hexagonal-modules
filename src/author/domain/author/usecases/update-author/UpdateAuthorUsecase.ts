import type { UpdateAuthorCommand } from './UpdateAuthorCommand';

import type { Author } from '@author/domain/author/entities/Author';
import {
  AuthorAlreadyExistsException,
  AuthorNotFoundException,
} from '@author/domain/author/exceptions';
import {
  type IAuthorRepository,
  IAuthorRepositorySymbol,
} from '@author/domain/author/ports/repositories/IAuthorRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateAuthorUsecase {
  public constructor(
    @Inject(IAuthorRepositorySymbol)
    private readonly authorRepository: IAuthorRepository,
  ) {}

  public async handle(
    authorId: number,
    author: UpdateAuthorCommand,
  ): Promise<Author> {
    const authorExistsWithSameId =
      await this.authorRepository.existsById(authorId);
    if (!authorExistsWithSameId) {
      throw new AuthorNotFoundException(`Author with id ${authorId} not found`);
    }
    if (author.email !== undefined) {
      const authorExistsWithSameEmail =
        await this.authorRepository.existsByEmail(author.email);
      if (authorExistsWithSameEmail) {
        throw new AuthorAlreadyExistsException(
          `Author with email ${author.email} already exists`,
        );
      }
    }
    return await this.authorRepository.updateAuthor(authorId, author);
  }
}
