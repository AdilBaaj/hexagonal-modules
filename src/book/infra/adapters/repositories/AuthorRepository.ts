import type { Author } from '@book/domain/author/entities/Author';
import type { IAuthorRepository } from '@book/domain/author/ports/repositories/IAuthorRepository';
import { AuthorDBEntity } from '@book/infra/entities/AuthorDBEntity';
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '@shared/infra/drizzle/utils';
import { getFirstElement } from '@shared/infra/utils';
import { count, eq } from 'drizzle-orm';
import { type NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class AuthorRepository implements IAuthorRepository {
  public constructor(
    @Inject(DRIZZLE)
    private readonly drizzle: NodePgDatabase,
  ) {}

  public async existsById(authorId: number): Promise<boolean> {
    const queryResult = await this.drizzle
      .select({ count: count() })
      .from(AuthorDBEntity)
      .where(eq(AuthorDBEntity.id, authorId));
    const authorsCount = getFirstElement(queryResult).count;
    return authorsCount > 0;
  }

  public async createAuthor(author: Author): Promise<Author> {
    const queryResult = await this.drizzle
      .insert(AuthorDBEntity)
      .values(author)
      .returning();

    return getFirstElement(queryResult);
  }

  public async updateAuthor(author: Author): Promise<Author> {
    const queryResult = await this.drizzle
      .update(AuthorDBEntity)
      .set(author)
      .where(eq(AuthorDBEntity.id, author.id))
      .returning();

    return getFirstElement(queryResult);
  }

  public async deleteAuthor(authorId: number): Promise<void> {
    await this.drizzle
      .delete(AuthorDBEntity)
      .where(eq(AuthorDBEntity.id, authorId))
      .execute();
  }
}
