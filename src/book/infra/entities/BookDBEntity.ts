import { AuthorDBEntity } from '@book/infra/entities/AuthorDBEntity';
import { DOMAIN_NAME } from '@book/infra/entities/constants';
import { tableCreator } from '@shared/infra/drizzle/utils';
import { serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const BookDBEntity = tableCreator(DOMAIN_NAME)('books', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  content: varchar('content').notNull(),
  authorId: serial('author_id').references(() => AuthorDBEntity.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
