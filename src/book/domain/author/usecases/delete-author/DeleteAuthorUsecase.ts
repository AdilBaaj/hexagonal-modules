import { AuthorNotFoundException } from '@book/domain/author/exceptions';
import {
  type IAuthorRepository,
  IAuthorRepositorySymbol,
} from '@book/domain/author/ports/repositories/IAuthorRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAuthorUsecase {
  public constructor(
    @Inject(IAuthorRepositorySymbol)
    private readonly authorRepository: IAuthorRepository,
  ) {}

  public async handle(authorId: number): Promise<void> {
    const authorExists = await this.authorRepository.existsById(authorId);
    if (!authorExists) {
      throw new AuthorNotFoundException(`Author with id ${authorId} not found`);
    }
    await this.authorRepository.deleteAuthor(authorId);
  }
}
