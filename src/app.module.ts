import { Module } from '@nestjs/common';
import { PersonsModule } from './person/persons.module';

@Module({
  imports: [PersonsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
