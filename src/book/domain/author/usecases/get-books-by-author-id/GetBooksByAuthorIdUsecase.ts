import { AuthorNotFoundException } from '@book/domain/author/exceptions';
import {
  type IAuthorRepository,
  IAuthorRepositorySymbol,
} from '@book/domain/author/ports/repositories/IAuthorRepository';
import type { Book } from '@book/domain/book/entities/Book';
import {
  type IBookRepository,
  IBookRepositorySymbol,
} from '@book/domain/book/ports/repositories/IBookRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetBooksByAuthorIdUsecase {
  public constructor(
    @Inject(IBookRepositorySymbol)
    private readonly bookRepository: IBookRepository,
    @Inject(IAuthorRepositorySymbol)
    private readonly authorRepository: IAuthorRepository,
  ) {}

  public async handle(authorId: number): Promise<Book[]> {
    const authorExists = await this.authorRepository.existsById(authorId);
    if (!authorExists) {
      throw new AuthorNotFoundException(`Author with id ${authorId} not found`);
    }
    return await this.bookRepository.findBooksByAuthorId(authorId);
  }
}
