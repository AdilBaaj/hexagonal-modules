import { IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateBookRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public content!: string;

  @IsPositive({
    message: 'The authorId must be a positive number',
  })
  public authorId!: number;
}
