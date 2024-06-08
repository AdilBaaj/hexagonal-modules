import type { AuthorDTO } from '@author/infra/adapters/external-api/model/AuthorDTO';
import { AuthorController } from '@book/api/author/AuthorController';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookApi {
  public constructor(private readonly authorController: AuthorController) {}
  public async createAuthor(author: AuthorDTO): Promise<void> {
    await this.authorController.createAuthor(author);
  }

  public async updateAuthor(author: AuthorDTO): Promise<void> {
    await this.authorController.updateAuthor(author);
  }

  public async deleteAuthor(authorId: number): Promise<void> {
    await this.authorController.deleteAuthor(authorId);
  }
}
