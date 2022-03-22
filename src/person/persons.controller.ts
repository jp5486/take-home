import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Post,
  Put,
} from '@nestjs/common';
import { Person as PersonModel } from '@prisma/client';
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

  @Get('/personById')
  async getPersonById(
    @Body()
    data: {
      id: number;
    },
  ): Promise<PersonProfile> {
    const person = await this.personService.latestPerson(data.id);

    if (!person) {
      console.log('Unable to find person');
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
      console.log('Unable to find person');
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
      console.log('Unable to create person');
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

  @Delete('/person')
  async deletePerson(
    @Body()
    data: {
      id: number;
    },
  ): Promise<PersonModel> {
    const tryDelete = await this.personService.deletePerson(data.id);

    if (tryDelete == undefined) {
      console.log('unable to find person with that ID');
      throw new NotFoundException();
    }

    // check for deletedAt field first
    if (tryDelete == null) {
      console.log('User has already been deleted');
      throw new ForbiddenException();
    }
    return tryDelete;
  }

  @Put('/person')
  async updatePerson(
    @Body()
    data: {
      id: number;
      firstName?: string;
      lastName?: string;
      address?: string;
      email?: string;
    },
  ): Promise<PersonModel> {
    const tryUpdate = this.personService.updatePerson({
      id: data.id,
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
      },
    });

    if (tryUpdate == undefined) {
      console.log('Unable to find person with that ID');
      throw new NotFoundException();
    }

    if (tryUpdate == null) {
      console.log('Unable to update person');
      throw new ForbiddenException();
    }
    return tryUpdate;
  }
}
