import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CrearBorradorDto } from './dto/crear-borrador.dto';

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

  it('/borradores (POST) crear articulo', async () => {
    const borradorACrear: CrearBorradorDto = {
      titulo: 'borrador integrador',
      categoria: 'Tech',
    }

    const resultado = await request(app.getHttpServer())
    .post('/borradores')
    .send(borradorACrear)
    
    const articuloRespuesta = resultado.body

    expect(articuloRespuesta).toBeDefined
    expect(articuloRespuesta._fecha_creacion).toBe(articuloRespuesta._fecha_modificacion)
  });

  it('/borradores (GET) listar borradores registrados', async () => {
    const resultadoListarTodos = await request(app.getHttpServer())
    .get('/borradores')
    .send()
    const articuloRespuesta = resultadoListarTodos.body
    expect(articuloRespuesta).toBeDefined
    expect(articuloRespuesta).toBeInstanceOf(Array);
  });

  it('/borradores (GET) busca un borrador por ID', async () => {
    const borradorACrear: CrearBorradorDto = {
        titulo: 'borrador integrador',
        categoria: 'Tech',
      }
  
      const registro = await request(app.getHttpServer())
      .post('/borradores')
      .send(borradorACrear)

      const borradorRegistrado = registro.body

      const buscadorBorrador = await request(app.getHttpServer())
      .get(`/borradores/${borradorRegistrado.id}`)
      .send()

      const buscarObjeto = buscadorBorrador.body

      expect(buscarObjeto).toBeDefined
      expect(buscarObjeto).toEqual(borradorRegistrado)

  });

  it('/borradores (PUT) busca borrador por id y modifica los cambios solicitados', async () => {
    const borradorACrear: CrearBorradorDto = {
        titulo: 'borrador integrador',
        categoria: 'Tech',
      }
  
      const registro = await request(app.getHttpServer())
      .post('/borradores')
      .send(borradorACrear)

      const borradorRegistrado = registro.body

      const nuevoBorrador: Partial<CrearBorradorDto> = {
        titulo: 'Articulo modificacion',
      }

      const modificado = await request(app.getHttpServer())
        .put(`/articulos/${borradorRegistrado.id}`)
        .send(nuevoBorrador)
        const borradorModificado = modificado.body
      
        expect(borradorModificado).toBeDefined
        expect(borradorModificado).not.toEqual(borradorRegistrado);
        expect(borradorModificado).not.toBe(borradorRegistrado);
        expect(borradorModificado._fecha_modificacion).not.toBe(borradorRegistrado._fecha_modificacion);

  });

  it('/borradores (PUT) modificar un Borrador que no existe', async () => {

      const nuevoBorrador: Partial<CrearBorradorDto> = {
        titulo: 'Articulo modificacion',
      }

      const modificado = await request(app.getHttpServer())
        .put(`/articulos/1`)
        .send(nuevoBorrador)
        const borradorModificado = modificado.body
        expect(borradorModificado.statusCode).toBe(404)
        expect(borradorModificado.error).toBe('Not Found')
        expect(borradorModificado.message).toBe('No se encontró el artículo buscado')
  });

  it('/borradores (DEL) elimina el borrador por el ID', async () => {
    const borradorACrear: CrearBorradorDto = {
        titulo: 'borrador integrador',
        categoria: 'Tech',
      }
  
      const registro = await request(app.getHttpServer())
      .post('/borradores')
      .send(borradorACrear)

      const borradorRegistrado = registro.body

      const elimino = await request(app.getHttpServer())
        .del(`/articulos/${borradorRegistrado.id}`)
        .send()
        const eliminadoBorrador = elimino.body

        expect(eliminadoBorrador).toBeDefined
  });

  it('/borradores (DEL) throw eliminado algo que no existe', async () => {

      const elimino = await request(app.getHttpServer())
        .del(`/articulos/1`)
        .send()
        const eliminadoBorrador = elimino.body
        expect(eliminadoBorrador).toBeDefined
        expect(eliminadoBorrador.statusCode).toBe(404)
        expect(eliminadoBorrador.message).toBe('No se encontró el artículo a eliminar')
        expect(eliminadoBorrador.error).toBe('Not Found')
  });


});
