import { DOMAIN_NAME } from '@book/infra/entities/constants';
import { tableCreator } from '@shared/infra/drizzle/utils';
import { serial, varchar } from 'drizzle-orm/pg-core';

export const AuthorDBEntity = tableCreator(DOMAIN_NAME)('authors', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
});
