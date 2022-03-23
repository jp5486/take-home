import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsEmail()
  email!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export class GetPersonByIdDto {
  @IsInt()
  id!: number;
}

export class GetPersonByIdVersionDto {
  @IsInt()
  id!: number;

  @IsInt()
  version!: number;
}

export class UpdatePersonDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsInt()
  id!: number;
}

export interface PersonProfile {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  deletedAt: Date;
  version: number;
}
