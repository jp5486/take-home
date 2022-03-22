import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Person, Prisma } from '@prisma/client';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

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

  async createPerson(data: Prisma.PersonCreateInput): Promise<Person> {
    return this.prisma.person.create({
      data,
    });
  }

  async updatePerson(params: {
    where: Prisma.PersonWhereUniqueInput;
    data: Prisma.PersonUpdateInput;
  }): Promise<Person> {
    const { where, data } = params;
    return this.prisma.person.update({
      data,
      where,
    });
  }

  async deletePerson(where: Prisma.PersonWhereUniqueInput): Promise<Person> {
    return this.prisma.person.delete({
      where,
    });
  }
}
