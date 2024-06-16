import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CrearArticuloDto } from './dto/crear-articulo.dto';

describe('CalculatorController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/articulos (POST) crear articulo', async () => {
    const articuloACrear: CrearArticuloDto = {
      titulo: 'Articulo integrador',
      contenido: 'Articulo integrador, lorem ipsum',
      categoria: 'Tech',
    }

    const resultado = await request(app.getHttpServer())
    .post('/articulos')
    .send(articuloACrear)
    
    const articuloRespuesta = resultado.body
    expect(articuloRespuesta).toBeDefined
    expect(Array.isArray(articuloRespuesta)).toBe(true)
  });


});
