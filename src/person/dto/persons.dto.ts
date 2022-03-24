import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePersonDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  firstName!: string;

  @ApiProperty()
  @IsString()
  lastName!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;
}

export class GetPersonByIdDto {
  @ApiProperty()
  @IsNumberString()
  id!: string;
}

export class DeletePersonByIdDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}

export class GetPersonByIdVersionDto {
  @ApiProperty()
  @IsNumberString()
  id!: string;

  @ApiProperty()
  @IsNumberString()
  version!: string;
}

export class UpdatePersonDto {
  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsInt()
  id!: number;
}
