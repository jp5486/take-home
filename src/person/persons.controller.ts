import { Body, Controller, Get, Param } from '@nestjs/common';
import { Person, Prisma } from '@prisma/client';
import { PersonsService } from './persons.service';

interface PersonProfile {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  deletedAt: Date;
  version: number;
}

@Controller()
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  // @Get('person')
  // async getPersonById(
  //   @Body()
  //   data: {
  //     id: number;
  //   },
  // ): Promise<PersonProfile> {
  //   const target = await this.personService.person(data.id);
  //   return target;
  // }

  @Get('/personById')
  async getPersonById(
    @Body()
    data: {
      id: number;
    },
  ): Promise<PersonProfile> {
    const person = await this.personService.latestPerson(data.id);

    return {
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      address: person.address,
      deletedAt: person.deletedAt,
      version: person.version,
    };
  }

  @Get('/personVersioned')
  async getPersonVersioned(
    @Body()
    data: {
      id: number;
      version: number;
    },
  ): Promise<PersonProfile> {
    const person = await this.personService.person({
      id_version: {
        id: data.id,
        version: data.version,
      },
    });

    return {
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      address: person.address,
      deletedAt: person.deletedAt,
      version: person.version,
    };
  }
}
