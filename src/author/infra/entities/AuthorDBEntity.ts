import { DOMAIN_NAME } from '@author/infra/entities/constants';
import { tableCreator } from '@shared/infra/drizzle/utils';
import { serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const AuthorDBEntity = tableCreator(DOMAIN_NAME)('authors', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  birthDate: timestamp('birth_date').notNull(),
  email: varchar('email').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
