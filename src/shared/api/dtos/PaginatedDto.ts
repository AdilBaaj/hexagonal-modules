export class PaginatedDto<T> {
  public data!: T[];
  public page!: number;
  public totalPage!: number;
  public totalItems!: number;
}
