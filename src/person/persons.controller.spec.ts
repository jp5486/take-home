import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PersonsModule } from './persons.module';

describe('Persons', () => {
  let app: INestApplication;
  let personsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PersonsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`End2End PersonController test`, async () => {
    let personId: number;
    const createPerson = await request(app.getHttpServer())
      .post('/person', () => {})
      .expect('Content-Type', /json/)
      .send({
        firstName: 'first',
        lastName: 'name',
        email: 'test@gmail.com',
      })
      .expect(201)
      .then((res) => {
        personId = res.body.id;
        expect(res.body).toEqual({
          id: personId,
          firstName: 'first',
          lastName: 'name',
          email: 'test@gmail.com',
          address: null,
          version: 1,
          deletedAt: null,
        });
      });

    const getById = await request(app.getHttpServer())
      .get(`/personById?id=${personId}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          id: personId,
          firstName: 'first',
          lastName: 'name',
          email: 'test@gmail.com',
          address: null,
          version: 1,
          deletedAt: null,
        });
      });

    // const getByVersioned = request(app.getHttpServer())
    //   .get('/personVersioned')
    //   .expect(200)
    //   .expect({
    //   });
    // const deletePerson = request(app.getHttpServer())
    //   .delete('/person')
    //   .expect(200)
    //   .expect({
    //   });
    // const updatePerson = request(app.getHttpServer())
    //   .put('/person')
    //   .expect(200)
    //   .expect({
    //   });
  });

  afterAll(async () => {
    await app.close();
  });
});
