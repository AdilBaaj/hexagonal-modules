import type { Author } from '@book/domain/author/entities/Author';
import { AuthorNotFoundException } from '@book/domain/author/exceptions';
import {
  type IAuthorRepository,
  IAuthorRepositorySymbol,
} from '@book/domain/author/ports/repositories/IAuthorRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateAuthorUsecase {
  public constructor(
    @Inject(IAuthorRepositorySymbol)
    private readonly authorRepository: IAuthorRepository,
  ) {}

  public async handle(author: Author): Promise<void> {
    const authorExists = await this.authorRepository.existsById(author.id);
    if (!authorExists) {
      throw new AuthorNotFoundException(
        `Author with id ${author.id} not found`,
      );
    }
    await this.authorRepository.updateAuthor(author);
  }
}
