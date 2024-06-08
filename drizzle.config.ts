import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config({
  path: `${process.cwd()}/env/.env.${String(process.env['NODE_ENV'])}`,
});

export default {
  schema: '**/infra/entities/*DBEntity.ts',
  out: './src/shared/infra/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: `${String(process.env['POSTGRES_HOST'])}`,
    port: Number(process.env['POSTGRES_PORT']),
    database: `${String(process.env['POSTGRES_DB'])}`,
    user: `${String(process.env['POSTGRES_USER'])}`,
    password: `${String(process.env['POSTGRES_PASSWORD'])}`,
  },
  strict: true,
  verbose: true,
} satisfies Config;
