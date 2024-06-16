import { Test, TestingModule } from '@nestjs/testing';
import { BorradoresController } from './borradores.controller';
import { BorradoresService } from './borradores.service';
import { BorradoresRepository } from './borradores.repository';
import { Borrador } from './borradores.entity';
import { CrearBorradorDto } from './dto/crear-borrador.dto';
import { NotFoundException } from '@nestjs/common';

describe('BorradoresController', () => {
  let controller: BorradoresController;
  let service: BorradoresService
  let repository: BorradoresRepository

  const borradorRespuesta =  new Borrador()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorradoresController],
      providers: [BorradoresService,BorradoresRepository]
    }).compile();

    controller = module.get<BorradoresController>(BorradoresController);
    service = module.get<BorradoresService>(BorradoresService);
    repository = module.get<BorradoresRepository>(BorradoresRepository);

    borradorRespuesta.id =  '1',
    borradorRespuesta.titulo =  'Mi primer articulo',
    borradorRespuesta.categoria =  'Medicina',
    borradorRespuesta._fecha_creacion =  new Date()
    borradorRespuesta._fecha_modificacion =  new Date()
  });

  it('Controllador Debería crear un borrador', () => {
    const crearBorrador: CrearBorradorDto = {
      titulo: 'Mi primer borrador',
      categoria: 'tech'
    }
    jest.spyOn(service, 'crear').mockImplementation(() => borradorRespuesta)
    const respuesCrear = controller.crearBorrador(crearBorrador)
    expect(respuesCrear).toBeInstanceOf(Borrador)
    expect(respuesCrear._fecha_creacion).toEqual(respuesCrear._fecha_modificacion)
  })

  it('Controllador Deberia listar todos los borradores', async () => {
    const result = await controller.buscarBorrador();
    expect(result).toBeInstanceOf(Array);
  });

  it('Controllador Deberia buscar por id y devolver un Borrador', async () => {
    const crearBorrador: CrearBorradorDto = {
      titulo: 'Mi primer borrador',
      categoria: 'tech'
    }
    const respuesCrear = repository.crear(crearBorrador)

    const resultado = await controller.buscarBorradorPorId(respuesCrear.id);
    expect(resultado).toEqual(respuesCrear)
  });

  it('Controllador Deberia buscar modificar mediante el id', async () => {
    const crearBorrador: CrearBorradorDto = {
      titulo: 'Mi primer borrador',
      categoria: 'tech'
    }
    const respuesCrear = repository.crear(crearBorrador)

    const nuevoBorrador: Partial<CrearBorradorDto> = {
      titulo: 'Mi primer articulo modificado',
    }
    const resultado = await controller.modificarBorrador(respuesCrear.id, nuevoBorrador);
    expect(resultado).toBeDefined
    expect(resultado._fecha_creacion).not.toBe(resultado._fecha_modificacion)
  });

  it('Controllador Deberia eliminar mediante el id', async () => {
    const crearBorrador: CrearBorradorDto = {
      titulo: 'Mi primer borrador',
      categoria: 'tech'
    }
    const respuesCrear = repository.crear(crearBorrador)
    expect(() => controller.eliminarBorrador(respuesCrear.id)).not.toThrow();
    expect(() => controller.eliminarBorrador(respuesCrear.id)).toThrow(NotFoundException);
  });

});
