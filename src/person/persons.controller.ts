import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
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

    if (!person) {
      throw new NotFoundException();
    }

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

    if (!person) {
      throw new NotFoundException();
    }

    return {
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      address: person.address,
      deletedAt: person.deletedAt,
      version: person.version,
    };
  }

  // create new person
  @Post('/person')
  async register(
    @Body()
    data: {
      firstName: string;
      lastName: string;
      email: string;
      address: string;
    },
  ): Promise<{
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    version: number;
  }> {
    const newPerson = await this.personService.createPerson(data);

    if (!newPerson) {
      throw new ForbiddenException();
    }

    return {
      firstName: newPerson.firstName,
      lastName: newPerson.lastName,
      email: newPerson.email,
      address: newPerson.address,
      version: newPerson.version,
    };
  }
}
