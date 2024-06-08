import {
  CreateBookUsecase,
  DeleteBookUsecase,
  GetBooksUsecase,
  GetBookUsecase,
  UpdateBookUsecase,
} from './book/usecases';

import {
  CreateAuthorUsecase,
  DeleteAuthorUsecase,
  GetBooksByAuthorIdUsecase,
  UpdateAuthorUsecase,
} from '@book/domain/author/usecases';
import { InfraModule } from '@book/infra/InfraModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfraModule],
  providers: [
    GetBooksUsecase,
    GetBookUsecase,
    CreateBookUsecase,
    UpdateBookUsecase,
    DeleteBookUsecase,
    GetBooksByAuthorIdUsecase,
    CreateAuthorUsecase,
    UpdateAuthorUsecase,
    DeleteAuthorUsecase,
  ],
  exports: [
    GetBooksUsecase,
    GetBookUsecase,
    CreateBookUsecase,
    UpdateBookUsecase,
    DeleteBookUsecase,
    GetBooksByAuthorIdUsecase,
    CreateAuthorUsecase,
    UpdateAuthorUsecase,
    DeleteAuthorUsecase,
  ],
})
export class DomainModule {}
