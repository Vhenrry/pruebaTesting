import { Then, When } from '@cucumber/cucumber';
import { ArticulosService } from "../../src/articulos/articulos.service";
import testContext from '../../features/helpers/context';
import { AppModule } from '../../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { before } from 'node:test';

let app: INestApplication
let articulosService: ArticulosService

before(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [ArticulosService]
  }).compile()

  app = moduleFixture.createNestApplication()
  await app.init()
  articulosService = app.get<ArticulosService>(ArticulosService)
  articulosService = app.get<ArticulosService>(ArticulosService)

})

When('creo un nuevo artículo con título {string} y contenido {string} en la categoría {string}', async (titulo, contenido, categoria) => {
  const articulo = await articulosService.crear({ titulo, contenido, categoria })
  testContext.articulo =  articulo
  return 'success'
})

Then('el artículo debe ser creado con el estado {string}', async (estado) => {
  expect(testContext.articulo).toBeDefined()
})