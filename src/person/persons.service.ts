import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Person, Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

interface UpdatePersonParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
}

@Injectable()
export class PersonsService {
  constructor(private prisma: PrismaService) {}

  // get Person by id_version
  async person(
    personWhereUniqueInput: Prisma.PersonWhereUniqueInput,
  ): Promise<Person | null> {
    return this.prisma.person.findUnique({
      where: personWhereUniqueInput,
    });
  }

  async persons(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PersonWhereUniqueInput;
    where?: Prisma.PersonWhereInput;
    orderBy?: Prisma.PersonOrderByWithRelationInput;
  }): Promise<Person[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.person.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // get latest Person version by ID
  async latestPerson(id: number): Promise<Person | null> {
    const latestPersonArr = await this.prisma.person.findMany({
      where: { id },
      orderBy: { version: 'desc' },
      take: 1,
    });

    return latestPersonArr?.[0];
  }

  async createPerson(data: Prisma.PersonCreateInput): Promise<Person> {
    return this.prisma.person.create({
      data,
    });
  }

  // Delete Person creates a new instance of the Person Object
  // Delete only updated the newest version of a person Object
  // deletedAt is populated
  // version is incremented
  async deletePerson(id: number): Promise<Person> {
    const target = await this.latestPerson(id);

    // if (target == undefined) {
    //   console.log('unable to find person by id');
    //   return undefined;
    // }

    // if (target.deletedAt !== null) {
    //   console.log(target);
    //   console.log('unable to delete person');
    //   return null;
    // }

    let newVersion = target.version + 1;

    return this.prisma.person.create({
      data: {
        id: target.id,
        firstName: target.firstName,
        lastName: target.lastName,
        email: target.email,
        address: target.address,
        deletedAt: DateTime.local().toJSDate(),
        version: newVersion,
      },
    });
  }

  // basic update
  // async updatePerson(params: {
  //   where: Prisma.PersonWhereUniqueInput;
  //   data: Prisma.PersonUpdateInput;
  // }): Promise<Person> {
  //   const { where, data } = params;
  //   return this.prisma.person.update({
  //     data,
  //     where,
  //   });
  // }

  // Update Person creates a new instance of the Person Object
  // Update only updated the newest version of a person Object
  // uses the available data to update if available
  // version is incremented
  async updatePerson(params: {
    id: number;
    data: UpdatePersonParams;
  }): Promise<Person> {
    const target = await this.latestPerson(params.id);

    // if (target == undefined) {
    //   console.log('unable to find person by id');
    //   return undefined;
    // }

    // if (!target) {
    //   console.log('unable to update person');
    //   return null;
    // }

    return this.prisma.person.create({
      data: {
        id: target.id,
        firstName: params.data.firstName || target.firstName,
        lastName: params.data.lastName || target.lastName,
        email: params.data.email || target.email,
        address: params.data.address || target.address,
        version: target.version + 1,
      },
    });
  }
}
