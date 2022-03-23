import { IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePersonDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  firstName!: string;
  lastName!: string;

  address?: string;
}

export class GetPersonByIdDto {
  @IsNotEmpty()
  id!: number;
}

export class GetPersonByIdVersionDto {
  @IsNotEmpty()
  id!: number;
  version!: number;
}

export class UpdatePersonDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  firstName?: string;
  lastName?: string;
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
