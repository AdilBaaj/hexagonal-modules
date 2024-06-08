import type { UpdateBookCommand } from './UpdateBookCommand';

import type { Book } from '@book/domain/book/entities/Book';
import { BookNotFoundException } from '@book/domain/book/exceptions';
import {
  type IBookRepository,
  IBookRepositorySymbol,
} from '@book/domain/book/ports/repositories/IBookRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateBookUsecase {
  public constructor(
    @Inject(IBookRepositorySymbol)
    private readonly bookRepository: IBookRepository,
  ) {}

  public async handle(bookId: number, book: UpdateBookCommand): Promise<Book> {
    const bookExists = await this.bookRepository.existsById(bookId);
    if (!bookExists) {
      throw new BookNotFoundException(`Book with id ${bookId} not found`);
    }
    return await this.bookRepository.updateBook(bookId, book);
  }
}
