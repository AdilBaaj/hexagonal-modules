import {
  CreateAuthorUsecase,
  DeleteAuthorUsecase,
  GetAuthorsUsecase,
  GetAuthorUsecase,
  UpdateAuthorUsecase,
} from '@author/domain/author/usecases';
import { InfraModule } from '@author/infra/InfraModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfraModule],
  providers: [
    GetAuthorsUsecase,
    GetAuthorUsecase,
    CreateAuthorUsecase,
    UpdateAuthorUsecase,
    DeleteAuthorUsecase,
  ],
  exports: [
    GetAuthorsUsecase,
    GetAuthorUsecase,
    CreateAuthorUsecase,
    UpdateAuthorUsecase,
    DeleteAuthorUsecase,
  ],
})
export class DomainModule {}
