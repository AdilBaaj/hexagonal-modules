import type { DrizzlePGConfig } from '@knaadh/nestjs-drizzle-pg/src/node-postgres.interface';
import type { ConfigService } from '@nestjs/config';
import type { ClientConfig } from 'pg';

export class DBConfigService {
  public constructor(private readonly configService: ConfigService) {}
  public create = () => {
    const config: ClientConfig = {
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      database: this.configService.get<string>('POSTGRES_DB'),
      user: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
    };
    return {
      pg: {
        connection: 'client' as const,
        config,
      },
      config: { schema: '**/infra/drizzle/schema/*DBEntity.ts' },
    } satisfies DrizzlePGConfig;
  };
}
