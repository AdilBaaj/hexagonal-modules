import type { Author } from '@author/domain/author/entities/Author';
import { AuthorNotFoundException } from '@author/domain/author/exceptions';
import {
  type IAuthorRepository,
  IAuthorRepositorySymbol,
} from '@author/domain/author/ports/repositories/IAuthorRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetAuthorUsecase {
  public constructor(
    @Inject(IAuthorRepositorySymbol)
    private readonly authorRepository: IAuthorRepository,
  ) {}

  public async handle(authorId: number): Promise<Author> {
    const author = await this.authorRepository.findAuthorById(authorId);
    if (author === undefined) {
      throw new AuthorNotFoundException(`Author with id ${authorId} not found`);
    }
    return author;
  }
}
