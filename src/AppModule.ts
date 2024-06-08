import { AuthorModule } from '@author/AuthorModule';
import { BookModule } from '@book/BookModule';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpLoggerMiddleware } from '@shared/api/middlewares/HttpLoggerMiddleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/.env.${String(process.env['NODE_ENV'])}`,
      isGlobal: true,
    }),
    BookModule,
    AuthorModule,
  ],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line class-methods-use-this
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
