import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
export class UpdateBookRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public content?: string;
}
