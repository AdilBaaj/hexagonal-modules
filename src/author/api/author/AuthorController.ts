import type { AuthorResponse } from '@author/api/author/dtos';
import {
  CreateAuthorRequest,
  UpdateAuthorRequest,
} from '@author/api/author/dtos';
import {
  CreateAuthorUsecase,
  DeleteAuthorUsecase,
  GetAuthorsUsecase,
  GetAuthorUsecase,
  UpdateAuthorUsecase,
} from '@author/domain/author/usecases';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import type { PaginatedDto } from '@shared/api/dtos';
import { PaginationQuery } from '@shared/api/dtos';

@Controller('author')
export class AuthorController {
  public constructor(
    private readonly getAuthorsUsecase: GetAuthorsUsecase,
    private readonly getAuthorUsecase: GetAuthorUsecase,
    private readonly createAuthorUsecase: CreateAuthorUsecase,
    private readonly updateAuthorUsecase: UpdateAuthorUsecase,
    private readonly deleteAuthorUsecase: DeleteAuthorUsecase,
  ) {}

  @Get('authors')
  public async getAuthors(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<AuthorResponse>> {
    return await this.getAuthorsUsecase.handle(paginationQuery);
  }

  @Get('authors/:authorId')
  public async getAuthor(
    @Param('authorId') authorId: number,
  ): Promise<AuthorResponse> {
    return await this.getAuthorUsecase.handle(authorId);
  }

  @Post('authors')
  public async createAuthor(
    @Body() createAuthorRequest: CreateAuthorRequest,
  ): Promise<AuthorResponse> {
    return await this.createAuthorUsecase.handle(createAuthorRequest);
  }

  @Patch('authors/:authorId')
  public async updateAuthor(
    @Param('authorId') authorId: number,
    @Body() updateAuthorRequest: UpdateAuthorRequest,
  ): Promise<AuthorResponse> {
    return await this.updateAuthorUsecase.handle(authorId, updateAuthorRequest);
  }

  @Delete('authors/:authorId')
  public async deleteAuthor(
    @Param('authorId') authorId: number,
  ): Promise<void> {
    await this.deleteAuthorUsecase.handle(authorId);
  }
}
