import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

@Module({
  imports: [],
  controllers: [PersonsController],
  providers: [PersonsService, PrismaService],
  exports: [PersonsService, PrismaService],
})
export class PersonsModule {}
