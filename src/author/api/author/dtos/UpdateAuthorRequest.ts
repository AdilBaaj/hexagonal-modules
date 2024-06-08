import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { IsDate, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateAuthorRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }: { value: Date | number | string }) => new Date(value))
  public birthDate?: Date;
}
