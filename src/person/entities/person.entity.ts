import { ApiProperty } from '@nestjs/swagger';

// used for swagger documentation
export class Person {
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  version: number;
}
