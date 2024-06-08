import { AuthorController } from '@book/api/author/AuthorController';
import { BookController } from '@book/api/book/BookController';
import { DomainModule } from '@book/domain/DomainModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [DomainModule],
  controllers: [BookController, AuthorController],
  providers: [AuthorController],
  exports: [AuthorController],
})
export class ApiModule {}
