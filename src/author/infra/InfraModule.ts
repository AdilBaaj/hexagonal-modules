import { BookApi } from './adapters/external-api/BookApi';

import { AuthorRepositoryProvider } from '@author/infra/adapters/providers';
import { BookModule } from '@book/BookModule';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DBConfigService } from '@shared/infra/drizzle/DBConfigService';
import { DRIZZLE } from '@shared/infra/drizzle/utils';

@Module({
  imports: [
    DrizzlePGModule.registerAsync({
      tag: DRIZZLE,
      useFactory: (configService: ConfigService) => {
        return new DBConfigService(configService).create();
      },
      inject: [ConfigService],
    }),
    BookModule,
  ],
  providers: [AuthorRepositoryProvider, BookApi],
  exports: [AuthorRepositoryProvider],
})
export class InfraModule {}
