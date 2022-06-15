import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../customer.controller';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../app.module';

const customerPayload = {
  name: 'John',
  surname: 'Doe',
};

const customer = {
  id: expect.any(Number),
  name: 'John',
  surname: 'Doe',
  status: 'ACTIVE',
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

describe('CustomerController', () => {
  let controller: CustomerController;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [TypeOrmModule.forFeature([CustomerRepository]), SharedModule],
    //   controllers: [CustomerController],
    //   providers: [CustomerService],
    // }).compile();

    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    controller = moduleFixture.get<CustomerController>(CustomerController);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('Create a Customer', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should retrieve all customers', async () => {
    const res = await request(app.getHttpServer()).get('/customers').send();
    expect(res.status).toBe(200);
    expect(res.body.length).toHaveProperty('id');
  });

  it('should create a new customer', async () => {
    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(customerPayload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toEqual(customer);
  });
});
