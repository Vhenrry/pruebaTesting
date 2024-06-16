import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { ArticulosService } from "../src/articulos/articulos.service";

let app: INestApplication

beforeAll(async () => {
  const moduleFixture =  await Test.createTestingModule({
    imports: [AppModule, ArticulosService]
  }).compile()

  app = moduleFixture.createNestApplication()
  await app.init()
  global['app'] = app
  
})

afterAll(async () => {
  await app.close()
})