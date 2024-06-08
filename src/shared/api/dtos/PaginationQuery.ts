import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  @IsInt()
  @IsPositive()
  public page!: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  public limit!: number;
}
