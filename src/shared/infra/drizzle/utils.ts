import { pgTableCreator } from 'drizzle-orm/pg-core';

export const tableCreator = (DOMAIN_NAME: string) =>
  pgTableCreator((name) => `${DOMAIN_NAME}_${name}`);

export const DRIZZLE = 'DB_PROD';
