import {
  Body,
  Get,
  Post,
  Put,
  Delete,
  Controller,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePersonDto,
  GetPersonByIdDto,
  GetPersonByIdVersionDto,
  UpdatePersonDto,
  PersonProfile,
} from './persons.dto';
import { Person as PersonModel } from '@prisma/client';
import { PersonsService } from './persons.service';

@Controller()
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @Get('/personById')
  async getPersonById(
    @Body()
    data: GetPersonByIdDto,
  ): Promise<PersonProfile> {
    const person = await this.personService.latestPerson(data.id);

    if (!person) {
      console.log('Unable to find person');
      throw new NotFoundException();
    }

    return person;
  }

  @Get('/personVersioned')
  async getPersonVersioned(
    @Body()
    data: GetPersonByIdVersionDto,
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

    return person;
  }

  // create new person
  @Post('/person')
  async register(
    @Body()
    data: CreatePersonDto,
  ): Promise<PersonModel> {
    const newPerson = await this.personService.createPerson(data);

    if (!newPerson) {
      console.log('Unable to create person');
      throw new ForbiddenException();
    }

    return newPerson;
  }

  @Delete('/person')
  async deletePerson(
    @Body()
    data: GetPersonByIdDto,
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
    data: UpdatePersonDto,
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
