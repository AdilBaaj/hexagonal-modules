import { AppModule } from '../src/AppModule';

import { GetBookUsecase } from '@book/domain/book/usecases';
import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockGetBooksUsecase = {
    getBooks: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GetBookUsecase)
      .useValue(mockGetBooksUsecase)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('/books (GET)', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer()).get('/books').expect(200);
  });
});
