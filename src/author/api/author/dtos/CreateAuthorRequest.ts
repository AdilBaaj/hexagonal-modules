import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAuthorRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public name!: string;

  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @IsDate()
  @Transform(({ value }: { value: Date | number | string }) => new Date(value))
  public birthDate!: Date;
}
