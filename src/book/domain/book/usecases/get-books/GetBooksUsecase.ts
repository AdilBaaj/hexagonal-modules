import type { Book } from '@book/domain/book/entities/Book';
import {
  type IBookRepository,
  IBookRepositorySymbol,
} from '@book/domain/book/ports/repositories/IBookRepository';
import { Inject, Injectable } from '@nestjs/common';
import type {
  PaginatedValue,
  PaginationQueryValue,
} from '@shared/domain/value-objects';

@Injectable()
export class GetBooksUsecase {
  public constructor(
    @Inject(IBookRepositorySymbol)
    private readonly bookRepository: IBookRepository,
  ) {}

  public async handle(
    paginationQuery: PaginationQueryValue,
  ): Promise<PaginatedValue<Book>> {
    return await this.bookRepository.findAllBooks(paginationQuery);
  }
}
