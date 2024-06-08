import type { BookResponse } from '@book/api/book/dtos';
import { CreateBookRequest, UpdateBookRequest } from '@book/api/book/dtos';
import {
  CreateBookUsecase,
  DeleteBookUsecase,
  GetBooksUsecase,
  GetBookUsecase,
  UpdateBookUsecase,
} from '@book/domain/book/usecases';
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

@Controller('book')
export class BookController {
  public constructor(
    private readonly getBooksUsecase: GetBooksUsecase,
    private readonly getBookUsecase: GetBookUsecase,
    private readonly createBookUsecase: CreateBookUsecase,
    private readonly updateBookUsecase: UpdateBookUsecase,
    private readonly deleteBookUsecase: DeleteBookUsecase,
  ) {}

  @Get('books')
  public async getBooks(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<BookResponse>> {
    return await this.getBooksUsecase.handle(paginationQuery);
  }

  @Get('books/:bookId')
  public async getBook(@Param('bookId') bookId: number): Promise<BookResponse> {
    return this.getBookUsecase.handle(bookId);
  }

  @Post('books')
  public async createBook(
    @Body() createBookRequest: CreateBookRequest,
  ): Promise<BookResponse> {
    return this.createBookUsecase.handle(createBookRequest);
  }

  @Patch('books/:bookId')
  public async updateBook(
    @Param('bookId') bookId: number,
    @Body() updateBookRequest: UpdateBookRequest,
  ): Promise<BookResponse> {
    return this.updateBookUsecase.handle(bookId, updateBookRequest);
  }

  @Delete('books/:bookId')
  public async deleteBook(@Param('bookId') bookId: number): Promise<void> {
    return this.deleteBookUsecase.handle(bookId);
  }
}
