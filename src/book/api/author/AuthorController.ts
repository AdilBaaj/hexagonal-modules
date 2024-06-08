import type { AuthorRequest } from '@book/api/author/dtos';
import type { BookResponse } from '@book/api/book/dtos';
import {
  CreateAuthorUsecase,
  DeleteAuthorUsecase,
  GetBooksByAuthorIdUsecase,
  UpdateAuthorUsecase,
} from '@book/domain/author/usecases';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('book')
export class AuthorController {
  public constructor(
    private readonly getBooksByAuthorIdUsecase: GetBooksByAuthorIdUsecase,
    private readonly createAuthorUsecase: CreateAuthorUsecase,
    private readonly updateAuthorUsecase: UpdateAuthorUsecase,
    private readonly deleteAuthorUsecase: DeleteAuthorUsecase,
  ) {}

  @Get('authors/:authorId')
  public async getBooksByAuthorId(
    @Param('authorId') authorId: number,
  ): Promise<BookResponse[]> {
    return await this.getBooksByAuthorIdUsecase.handle(authorId);
  }

  public async createAuthor(author: AuthorRequest): Promise<void> {
    await this.createAuthorUsecase.handle(author);
  }

  public async updateAuthor(author: AuthorRequest): Promise<void> {
    await this.updateAuthorUsecase.handle(author);
  }

  public async deleteAuthor(authorId: number): Promise<void> {
    await this.deleteAuthorUsecase.handle(authorId);
  }
}
