import { Test, TestingModule } from '@nestjs/testing';
import { BorradoresService } from './borradores.service';
import { BorradoresRepository } from './borradores.repository';
import { Borrador } from './borradores.entity';
import { CrearBorradorDto } from './dto/crear-borrador.dto';
import { NotFoundException } from '@nestjs/common';

describe('BorradoresService', () => {
  let service: BorradoresService;
  let repository: BorradoresRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorradoresService,BorradoresRepository],
    }).compile();

    service = module.get<BorradoresService>(BorradoresService);
    repository = module.get<BorradoresRepository>(BorradoresRepository);
  });

  it('service debe crear un borrador', () => {
    const miBorrador: Borrador = new Borrador()
    miBorrador.id='1'
    miBorrador.titulo='Primer titulo'
    miBorrador.categoria='principiante'
    miBorrador._fecha_modificacion = new Date
    miBorrador._fecha_creacion = new Date

    jest.spyOn(repository, 'crear').mockImplementation(() => miBorrador)

    const nuevoBorrador: CrearBorradorDto = {
      titulo: 'Mi primer articulo',
      categoria: 'principiante'
    }

    const resultado = service.crear(nuevoBorrador)
    expect(resultado).toBeInstanceOf(Borrador)
  });

  it('service deberia crear un borrador, buscar el borrador por id y comparar que el creado sea igual al buscado por id', () => {
    const nuevoBorrador: CrearBorradorDto = {
      titulo: 'Mi primer articulo',
      categoria: 'principiante'
    }
    const resultadoCrear = service.crear(nuevoBorrador)
    const resultadoBuscar = service.buscarPorId(resultadoCrear.id)
    expect(resultadoBuscar).toEqual(resultadoCrear)
  })

  it('service deberia modificar un borrador', () => {
    const miBorrador: Borrador = new Borrador()
    
    miBorrador.id= '1',
    miBorrador.titulo='Primer titulo'
    miBorrador.categoria='principiante'
    miBorrador._fecha_modificacion = new Date
    miBorrador._fecha_creacion = new Date

    
    jest.spyOn(repository, 'actualizar').mockImplementation(() => miBorrador)
    const nuevoBorrador: Partial<CrearBorradorDto> = {
      titulo: 'Mi primer articulo modificado',
    }
    const resultado = service.modificar('1', nuevoBorrador)
    expect(resultado).toBeInstanceOf(Borrador)
    expect(resultado._fecha_creacion).not.toBe(resultado._fecha_modificacion)
  })

  it('service deberia devolver todos los borradores registrados', async () => {
    const resultado = await service.buscarTodo();
    expect(resultado).toBeInstanceOf(Array);
  });

  it('service deberia eliminar el borrador por el id', () => {
    expect(() => repository.eliminar('non-existent-id')).toThrow(NotFoundException);
  })

});
