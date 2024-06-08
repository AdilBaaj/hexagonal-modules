export interface PaginatedValue<T> {
  data: T[];
  page: number;
  totalPage: number;
  totalItems: number;
}
