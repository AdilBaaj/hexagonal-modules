import { BookNotFoundException } from '@book/domain/book/exceptions';
import {
  type IBookRepository,
  IBookRepositorySymbol,
} from '@book/domain/book/ports/repositories/IBookRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteBookUsecase {
  public constructor(
    @Inject(IBookRepositorySymbol)
    private readonly bookRepository: IBookRepository,
  ) {}

  public async handle(bookId: number): Promise<void> {
    const bookExists = await this.bookRepository.existsById(bookId);
    if (!bookExists) {
      throw new BookNotFoundException(`Book with id ${bookId} not found`);
    }
    await this.bookRepository.deleteBook(bookId);
  }
}
