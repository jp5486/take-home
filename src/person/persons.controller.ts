import {
  Body,
  Get,
  Post,
  Put,
  Delete,
  Controller,
  ForbiddenException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  CreatePersonDto,
  GetPersonByIdDto,
  GetPersonByIdVersionDto,
  UpdatePersonDto,
  DeletePersonByIdDto,
} from './dto/persons.dto';
import { Person } from './entities/person.entity';
import { PersonsService } from './persons.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('person')
@Controller()
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @Get('/personById')
  async getPersonById(
    @Query()
    data: GetPersonByIdDto,
  ): Promise<Person> {
    const person = await this.personService.latestPerson(parseInt(data.id));

    if (!person) {
      console.log('Unable to find person');
      throw new NotFoundException();
    }

    return person;
  }

  @Get('/personVersioned')
  async getPersonVersioned(
    @Query()
    data: GetPersonByIdVersionDto,
  ): Promise<Person> {
    const person = await this.personService.person({
      id_version: {
        id: parseInt(data.id),
        version: parseInt(data.version),
      },
    });

    if (!person) {
      console.log('Unable to find person');
      throw new NotFoundException();
    }

    return person;
  }

  // create new person
  @ApiCreatedResponse({ type: Person })
  @Post('/person')
  async register(
    @Body()
    data: CreatePersonDto,
  ): Promise<Person> {
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
    data: DeletePersonByIdDto,
  ): Promise<Person> {
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
  ): Promise<Person> {
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
