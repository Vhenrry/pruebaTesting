import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest';
import { AppModule } from '../../src/app.module'
import { CrearArticuloDto } from './dto/crear-articulo.dto'
import { ArticulosService } from './articulos.service'
import { ArticulosRepository } from './articulos.repository';



describe('Articulos Acceptance', () => {
  let app: INestApplication
  let articulosService: ArticulosService
  let articulosRepository: ArticulosRepository

  beforeAll(async () => {
    const moduleFixture: TestingModule =  await Test.createTestingModule({
      imports: [AppModule],
      providers: [ArticulosService, ArticulosRepository],
    }).compile()

    app = moduleFixture.createNestApplication()
    articulosService = moduleFixture.get<ArticulosService>(ArticulosService)
    articulosRepository = moduleFixture.get<ArticulosRepository>(ArticulosRepository)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Debería crear un artículo y retornar en la respuesta [Acceptance]', async() => {
    const fechaActual = new Date()

    const articuloCrear: CrearArticuloDto = {
      titulo: 'Articulo aceptación',
      contenido: 'Lorem Ipsum dolor at simet...',
      categoria: 'Office'
    }

    const respuestaCrear =  await request(app.getHttpServer())
    .post('/articulos')
    .send(articuloCrear)

    expect(respuestaCrear.status).toBe(201)
    // expect(respuestaCrear.body).toEqual({ ...articuloCrear, id: '1', _fecha_creacion: fechaActual.toISOString() })
    expect(respuestaCrear.body.titulo).toEqual(articuloCrear.titulo);

  })

  it('Deberia modificar un articulo [Acceptance]', async () => {

    const articuloCrear: CrearArticuloDto = {
      titulo: 'Articulo aceptación',
      contenido: 'Lorem Ipsum dolor at simet...',
      categoria: 'Office'
    }

    const articuloCreado = await articulosService.crear(articuloCrear)

    const idArticuloAModificar = articuloCreado.id;
    const datosModificacion: Partial<CrearArticuloDto> = {
      titulo: 'Articulo de aceptación modificado',
      contenido: 'Este articulo ha sido modificado.',
      categoria: 'Desarrollo',
    };

    const respuestaModificar = await request(app.getHttpServer())
      .put(`/articulos/${idArticuloAModificar}`)
      .send(datosModificacion);

    expect(respuestaModificar.status).toBe(200);
    expect(respuestaModificar.body.id).toEqual(idArticuloAModificar);

    const articuloActualizado = await articulosService.buscarPorId(idArticuloAModificar);
    expect(articuloActualizado).toBeDefined();
    expect(articuloActualizado.titulo).toEqual(datosModificacion.titulo);
    expect(articuloActualizado.contenido).toEqual(datosModificacion.contenido);
    expect(articuloActualizado.categoria).toEqual(datosModificacion.categoria);
  })
})