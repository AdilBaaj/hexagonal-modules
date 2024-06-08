import type { Book } from '@book/domain/book/entities/Book';
import { BookNotFoundException } from '@book/domain/book/exceptions';
import {
  type IBookRepository,
  IBookRepositorySymbol,
} from '@book/domain/book/ports/repositories/IBookRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetBookUsecase {
  public constructor(
    @Inject(IBookRepositorySymbol)
    private readonly bookRepository: IBookRepository,
  ) {}

  public async handle(bookId: number): Promise<Book> {
    const book = await this.bookRepository.findBookById(bookId);
    if (book === undefined) {
      throw new BookNotFoundException(`Book with id ${bookId} not found`);
    }
    return book;
  }
}
