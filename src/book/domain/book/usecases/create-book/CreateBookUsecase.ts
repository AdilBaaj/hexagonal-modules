import type { CreateBookCommand } from './CreateBookCommand';

import type { Book } from '@book/domain/book/entities/Book';
import {
  type IBookRepository,
  IBookRepositorySymbol,
} from '@book/domain/book/ports/repositories/IBookRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateBookUsecase {
  public constructor(
    @Inject(IBookRepositorySymbol)
    private readonly bookRepository: IBookRepository,
  ) {}

  public async handle(book: CreateBookCommand): Promise<Book> {
    return await this.bookRepository.createBook(book);
  }
}
