import { AUTHORS_DATA, BOOKS_DATA } from './data';

import { AuthorDBEntity } from '@author/infra/entities/AuthorDBEntity';
import { AuthorDBEntity as BookAuthorDBEntity } from '@book/infra/entities/AuthorDBEntity';
import { BookDBEntity } from '@book/infra/entities/BookDBEntity';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

dotenv.config({
  path: `${process.cwd()}/env/.env.${String(process.env['NODE_ENV'])}`,
});

const client = new Pool({
  host: String(process.env['POSTGRES_HOST']),
  port: parseInt(String(process.env['POSTGRES_PORT']), 10),
  database: String(process.env['POSTGRES_DB']),
  user: String(process.env['POSTGRES_USER']),
  password: String(process.env['POSTGRES_PASSWORD']),
});
const db = drizzle(client);

const seed = async () => {
  await db.transaction(async (trx) => {
    await trx.delete(BookDBEntity).execute();
    await trx.delete(AuthorDBEntity).execute();
    await trx.delete(BookAuthorDBEntity).execute();
  });

  const bookAuthors = await db
    .insert(AuthorDBEntity)
    .values(AUTHORS_DATA)
    .returning();

  await db.insert(BookAuthorDBEntity).values(bookAuthors);
  await db.insert(BookDBEntity).values(
    BOOKS_DATA.map((book, index) => {
      const authorId = bookAuthors[index % bookAuthors.length]?.id;
      if (authorId === undefined) throw new Error('Author not found');
      return {
        content: book.content,
        title: book.title,
        authorId,
      };
    }),
  );
};

seed()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    // eslint-disable-next-line no-console
    console.log('Seed completed');
    process.exit(0);
  });
