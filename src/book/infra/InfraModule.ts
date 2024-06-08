import {
  AuthorRepositoryProvider,
  BookRepositoryProvider,
} from '@book/infra/adapters/providers';
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
  ],
  providers: [BookRepositoryProvider, AuthorRepositoryProvider],
  exports: [BookRepositoryProvider, AuthorRepositoryProvider],
})
export class InfraModule {}
