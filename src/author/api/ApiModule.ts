import { AuthorController } from '@author/api/author/AuthorController';
import { DomainModule } from '@author/domain/DomainModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [DomainModule],
  controllers: [AuthorController],
})
export class ApiModule {}
