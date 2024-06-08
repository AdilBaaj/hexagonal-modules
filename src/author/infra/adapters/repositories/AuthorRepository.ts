import { BookApi } from '../external-api/BookApi';

import type { Author } from '@author/domain/author/entities/Author';
import type { IAuthorRepository } from '@author/domain/author/ports/repositories/IAuthorRepository';
import type {
  NewAuthor,
  UpdateAuthor,
} from '@author/domain/author/value-objects';
import { AuthorDBEntity } from '@author/infra/entities/AuthorDBEntity';
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
export class AuthorRepository implements IAuthorRepository {
  public constructor(
    @Inject(DRIZZLE)
    private readonly drizzle: NodePgDatabase,
    private readonly bookApi: BookApi,
  ) {}

  public async findAllAuthors({
    limit = DEFAULT_PAGINATION.limit,
    page = DEFAULT_PAGINATION.page,
  }: PaginationQueryValue): Promise<PaginatedValue<Author>> {
    const drizzlePagination = getDrizzlePagination(page, limit);
    const authors = await this.drizzle
      .select()
      .from(AuthorDBEntity)
      .limit(limit)
      .offset(drizzlePagination.offset);

    const totalItems = await this.drizzle
      .select({ count: count() })
      .from(AuthorDBEntity);

    const totalCount = getFirstElement(totalItems).count;

    return {
      data: authors,
      page,
      totalPage: Math.ceil(totalCount / limit),
      totalItems: totalCount,
    };
  }

  public async findAuthorById(id: number): Promise<Optional<Author>> {
    const author = await this.drizzle
      .select()
      .from(AuthorDBEntity)
      .where(eq(AuthorDBEntity.id, id));

    return author.at(0);
  }

  public async createAuthor(author: NewAuthor): Promise<Author> {
    const queryResult = await this.drizzle
      .insert(AuthorDBEntity)
      .values(author)
      .returning();
    const createdAuthor = getFirstElement(queryResult);
    await this.bookApi.createAuthor(createdAuthor);
    return createdAuthor;
  }

  public async updateAuthor(id: number, author: UpdateAuthor): Promise<Author> {
    const queryResult = await this.drizzle
      .update(AuthorDBEntity)
      .set(author)
      .where(eq(AuthorDBEntity.id, id))
      .returning();
    const updatedAuthor = getFirstElement(queryResult);
    // ? should we check if any fields that concerns the book is updated ?
    await this.bookApi.updateAuthor(updatedAuthor);
    return updatedAuthor;
  }

  public async existsById(id: number): Promise<boolean> {
    const queryResult = await this.drizzle
      .select({ count: count() })
      .from(AuthorDBEntity)
      .where(eq(AuthorDBEntity.id, id));
    const authorsCount = getFirstElement(queryResult).count;
    return authorsCount > 0;
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const queryResult = await this.drizzle
      .select({ count: count() })
      .from(AuthorDBEntity)
      .where(eq(AuthorDBEntity.email, email));
    const authorsCount = getFirstElement(queryResult).count;
    return authorsCount > 0;
  }

  public async deleteAuthor(id: number): Promise<void> {
    await this.drizzle.delete(AuthorDBEntity).where(eq(AuthorDBEntity.id, id));
    await this.bookApi.deleteAuthor(id);
  }
}
