import type { Book } from '@book/domain/book/entities/Book';
import type { IBookRepository } from '@book/domain/book/ports/repositories/IBookRepository';
import type { NewBook, UpdateBook } from '@book/domain/book/value-objects';
import { BookDBEntity } from '@book/infra/entities/BookDBEntity';
import { Inject, Injectable } from '@nestjs/common';
import type {
  PaginatedValue,
  PaginationQueryValue,
} from '@shared/domain/value-objects';
import { DEFAULT_PAGINATION } from '@shared/infra/constants';
import { DRIZZLE } from '@shared/infra/drizzle/utils';
import { getDrizzlePagination, getFirstElement } from '@shared/infra/utils';
import type { Optional } from '@shared/types';
import { count, eq } from 'drizzle-orm';
import { type NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class BookRepository implements IBookRepository {
  public constructor(
    @Inject(DRIZZLE)
    private readonly drizzle: NodePgDatabase,
  ) {}

  public async findAllBooks({
    limit = DEFAULT_PAGINATION.limit,
    page = DEFAULT_PAGINATION.page,
  }: PaginationQueryValue): Promise<PaginatedValue<Book>> {
    const drizzlePagination = getDrizzlePagination(page, limit);
    const books = await this.drizzle
      .select()
      .from(BookDBEntity)
      .limit(limit)
      .offset(drizzlePagination.offset);

    const totalItemsQuery = await this.drizzle
      .select({ count: count() })
      .from(BookDBEntity);

    const totalItems = getFirstElement(totalItemsQuery).count;

    return {
      data: books,
      page,
      totalPage: Math.ceil(totalItems / limit),
      totalItems,
    };
  }

  public async findBookById(bookId: number): Promise<Optional<Book>> {
    const queryResult = await this.drizzle
      .select()
      .from(BookDBEntity)
      .where(eq(BookDBEntity.id, bookId));

    return getFirstElement(queryResult);
  }

  public async createBook(book: NewBook): Promise<Book> {
    const queryResult = await this.drizzle
      .insert(BookDBEntity)
      .values(book)
      .returning();
    return getFirstElement(queryResult);
  }

  public async updateBook(bookId: number, book: UpdateBook): Promise<Book> {
    const queryResult = await this.drizzle
      .update(BookDBEntity)
      .set(book)
      .where(eq(BookDBEntity.id, bookId))
      .returning();
    return getFirstElement(queryResult);
  }

  public async existsById(bookId: number): Promise<boolean> {
    const queryResult = await this.drizzle
      .select({ count: count() })
      .from(BookDBEntity)
      .where(eq(BookDBEntity.id, bookId));
    const booksCount = getFirstElement(queryResult).count;
    return booksCount > 0;
  }

  public async deleteBook(bookId: number): Promise<void> {
    await this.drizzle.delete(BookDBEntity).where(eq(BookDBEntity.id, bookId));
  }

  public async findBooksByAuthorId(authorId: number): Promise<Book[]> {
    const books = await this.drizzle
      .select()
      .from(BookDBEntity)
      .where(eq(BookDBEntity.authorId, authorId));
    return books;
  }
}
